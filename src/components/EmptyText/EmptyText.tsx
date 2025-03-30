import styles from './EmptyText.module.scss';

const EmptyText = ({
  text,
  className
}: {
  className?: string;
  text: string
}) => {
  return (
    <div className={`${styles['empty']} ${className}`}>{text}</div>
  );
}

export default EmptyText;