import ReactQuill from "react-quill";
import CustomToolbar from "./Toolbar";
import {formats} from './constants'
import styles from './Editor.module.scss';

const Editor = ({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  return (
    <div id='the-editor' className={styles['editor']}>
      <CustomToolbar className={styles['editor__toolbar']} />

      <ReactQuill
        className={styles['editor__field']}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Editor;