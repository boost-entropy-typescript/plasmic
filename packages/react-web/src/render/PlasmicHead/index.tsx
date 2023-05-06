import * as React from "react";

export const PlasmicHeadContext = React.createContext<
  React.ComponentType<any> | undefined
>(undefined);

type PlasmicHeadProps = {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
};

export function PlasmicHead(props: PlasmicHeadProps) {
  const Head = React.useContext(PlasmicHeadContext);
  if (!Head) {
    console.warn(
      `Plasmic: Head meta tags are being ignored. To make them work, pass a Head component into PlasmicRootProvider.`
    );
    // TODO: Link to doc about Head.
    return null;
  }

  // Helmet does not support React.Fragments, so we need to use `[<meta />,
  // <meta />]` instead of `<><meta /><meta /></>`.
  return (
    <Head>
      {props.image ? (
        [
          <meta
            key="twitter:card"
            name="twitter:card"
            content="summary_large_image"
          />,
          <meta key="og:image" property="og:image" content={props.image} />,
          <meta
            key="twitter:image"
            name="twitter:image"
            content={props.image}
          />,
        ]
      ) : (
        <meta key="twitter:card" name="twitter:card" content="summary" />
      )}
      {props.title && [
        <title key="title">{props.title}</title>,
        <meta key="og:title" property="og:title" content={props.title} />,
        <meta
          key="twitter:title"
          property="twitter:title"
          content={props.title}
        />,
      ]}
      {props.description && [
        <meta
          key="description"
          name="description"
          content={props.description}
        />,
        <meta
          key="og:description"
          property="og:description"
          content={props.description}
        />,
        <meta
          key="twitter:description"
          name="twitter:description"
          content={props.description}
        />,
      ]}
      {props.canonical && (
        <link key="canonical" ref="canonical" href={props.canonical} />
      )}
    </Head>
  );
}

export const plasmicHeadMeta = {
  name: "hostless-plasmic-head",
  displayName: "Page Metadata Override",
  description: "Set page metadata (HTML <head />) to dynamic values.",
  importName: "PlasmicHead",
  importPath: "@plasmicapp/react-web",
  isRepeatable: false,
  styleSections: false,
  props: {
    title: {
      type: "string",
      displayName: "Title",
    },
    description: {
      type: "string",
      displayName: "Description",
    },
    image: {
      type: "imageUrl",
      displayName: "Image",
    },
    canonical: {
      type: "string",
      displayName: "Canonical URL",
    },
  },
};
