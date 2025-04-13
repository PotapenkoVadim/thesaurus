import { ChangeEventHandler, ReactNode } from 'react';
import styles from './Switch.module.scss';

const Switch = ({
  checked = false,
  onChange,
  label,
  className
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: ReactNode;
  className?: string;
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.checked);
  };

  const toggleChecked = () => {
    onChange(!checked);
  };

  return (
    <label className={`${styles["switch"]} ${className}`}>
      {label}
      <span className={styles['switch__switcher']}>
        <input 
          type="checkbox"
          id="toggleInput"
          checked={checked}
          onChange={handleChange}
        />
        <button
          className={styles["slider"]}
          type="button"
          onClick={toggleChecked} />
      </span>               
    </label>       
  );
};

export default Switch;