import { useNavigate } from "react-router";
import { APP_PATHS } from "../../constants";
import styles from './BackButton.module.scss';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(APP_PATHS.home);

  return (
    <button
      className={styles['back-button']}
      type='button'
      onClick={handleBack}
    >
      <span className="material-symbols-outlined">
        arrow_back_ios
      </span>
      Назад
    </button>
  );
}

export default BackButton;