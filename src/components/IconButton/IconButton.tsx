import styles from './IconButton.module.scss';

const IconButton = ({
  icon,
  onClick
}: {
  icon: string;
  onClick: () => void;
}) => {
  return (
    <button className={styles['icon-button']} onClick={onClick}>
      <span className="material-symbols-outlined">
        {icon}
      </span>
    </button>
  );
}

export default IconButton;