import { PlasmicCanvasContext, repeatedElement } from "@plasmicapp/host";
import registerComponent, {
  ComponentMeta,
} from "@plasmicapp/host/registerComponent";
import React from "react";
import { CategoryProvider, PrimaryCategoryContext } from "./contexts";
import { Registerable } from "./registerable";
import useCategories from "./site/use-categories";
import { Category } from "./types/site";

interface CategoryCollectionProps {
  className?: string;
  children?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  loadingMessage?: React.ReactNode;
  noLayout?: boolean;
  category?: string;
  setControlContextData?: (data: { categories: Category[] }) => void;
}

export const categoryCollectionMeta: ComponentMeta<CategoryCollectionProps> = {
  name: "plasmic-commerce-category-collection",
  displayName: "Category Collection",
  props: {
    children: {
      type: "slot",
      defaultValue: [
        {
          type: "vbox",
          children: [
            {
              type: "component",
              name: "plasmic-commerce-category-field",
              props: {
                field: "name",
              },
            },
            {
              type: "component",
              name: "plasmic-commerce-product-collection",
            },
          ],
          styles: {
            width: "100%",
            minWidth: 0,
          },
        },
      ],
    },
    noLayout: {
      type: "boolean",
    },
    emptyMessage: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "No collection found!",
      },
    },
    loadingMessage: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Loading...",
      },
    },
    category: {
      type: "choice",
      options: (props, ctx) => {
        return (
          ctx?.categories.map((category) => ({
            label: `${"  ".repeat(category.depth ?? 0)}${category.name}`,
            value: category.id,
          })) ?? []
        );
      },
    },
  },
  defaultStyles: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: "8px",
    padding: "8px",
    maxWidth: "100%",
  },
  importPath: "@plasmicpkgs/commerce",
  importName: "CategoryCollection",
};

export function CategoryCollection(props: CategoryCollectionProps) {
  const {
    children,
    noLayout,
    className,
    loadingMessage,
    emptyMessage,
    category: selectedCategory,
    setControlContextData,
  } = props;

  const inEditor = React.useContext(PlasmicCanvasContext);

  const {
    data: allCategories,
    isLoading: isAllCategoriesLoading,
  } = useCategories();

  const { data: categories, isLoading } = useCategories({
    categoryId: selectedCategory,
    addIsEmptyField: !!inEditor,
  });

  if (allCategories) {
    setControlContextData?.({
      categories: allCategories,
    });
  }

  const firstCategoryNotEmpty = categories?.find(
    (category) => !category.isEmpty
  );
  const firstCategoryNotEmptyIndex =
    categories?.findIndex((category) => !category.isEmpty) ?? -1;

  const renderedData = categories?.map((category, i) => (
    <CategoryProvider category={category} key={category.id}>
      {repeatedElement(
        i < firstCategoryNotEmptyIndex
          ? i + 1
          : i === firstCategoryNotEmptyIndex
          ? 0
          : i,
        children
      )}
    </CategoryProvider>
  ));

  if ([isAllCategoriesLoading, isLoading].includes(true)) {
    return React.isValidElement(loadingMessage) ? loadingMessage : null;
  }

  if (!categories || categories.length === 0) {
    return React.isValidElement(emptyMessage) ? emptyMessage : null;
  }

  return (
    <PrimaryCategoryContext.Provider
      value={firstCategoryNotEmpty ?? categories[0]}
    >
      {noLayout ? (
        <React.Fragment>{renderedData}</React.Fragment>
      ) : (
        <div className={className}>{renderedData}</div>
      )}
    </PrimaryCategoryContext.Provider>
  );
}

export function registerCategoryCollection(
  loader?: Registerable,
  customCategoryCollectionMeta?: ComponentMeta<CategoryCollectionProps>
) {
  const doRegisterComponent: typeof registerComponent = (...args) =>
    loader ? loader.registerComponent(...args) : registerComponent(...args);
  doRegisterComponent(
    CategoryCollection,
    customCategoryCollectionMeta ?? categoryCollectionMeta
  );
}
