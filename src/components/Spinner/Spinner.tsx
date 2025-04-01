import styles from './Spinner.module.scss';

const Spinner = ({
  className
}:{
  className?: string;
}) => {
  return <span className={`${styles['spinner']} ${className}`}></span>;
}

export default Spinner;