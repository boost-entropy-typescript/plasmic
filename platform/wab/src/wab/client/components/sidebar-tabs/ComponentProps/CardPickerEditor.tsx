import React from "react";
import { BareModal } from "../../studio/BareModal";
import Chip from "../../widgets/Chip";
import CardPickerItem from "./CardPickerItem";
import CardPickerModal from "./CardPickerModal";

export function CardPickerEditor(props: {
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string | null | undefined;
  title?: React.ReactNode;
  showInput?: boolean;
  options: {
    value: string;
    label?: string;
    imgUrl: string;
    footer?: React.ReactNode;
  }[];
}) {
  const { onChange, onSearch, value, title, options, showInput } = props;
  const [show, setShow] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const onCancel = () => {
    setShow(false);
    setSearch("");
  };
  const onSave = () => {
    setShow(false);
    onChange(search);
  };
  React.useEffect(() => {
    onSearch?.(search);
  }, [search]);

  return (
    <>
      <div className="flex-fill flex-left text-ellipsis">
        <Chip onClick={() => setShow(true)}>
          <span className="line-clamp-12">
            {value
              ? options.find((option) => option.value === value)?.label ?? value
              : "unset"}
          </span>
        </Chip>
      </div>
      {show && (
        <BareModal onClose={onCancel} width={1200}>
          <CardPickerModal
            showInput={showInput}
            title={title}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave();
              }
            }}
            onCancel={onCancel}
          >
            {options.map((option) => (
              <CardPickerItem
                imgUrl={option.imgUrl}
                title={option.footer}
                onClick={() => {
                  onChange(option.value);
                  onCancel();
                }}
              />
            ))}
          </CardPickerModal>
        </BareModal>
      )}
    </>
  );
}
