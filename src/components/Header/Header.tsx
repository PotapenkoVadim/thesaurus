import { useState } from "react";
import { Link } from "react-router";
import { APP_PATHS } from "../../constants";
import IconButton from "../IconButton/IconButton";
import BottomSheet from "../BottomSheet/BottomSheet";
import SettingsForm from "../SettingsForm/SettingsForm";
import styles from './Header.module.scss';

const Header = () => {
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const openSettings = () => setIsOpenSettings(true);
  const closeSettings = () => setIsOpenSettings(false);

  return (
    <header className={styles['header']}>
      <Link className={styles['header__logo']} to={APP_PATHS.home}>
        Thesaurus App
      </Link>

      <IconButton icon="settings" onClick={openSettings} />

      <BottomSheet title="Настройки" isOpen={isOpenSettings} onClose={closeSettings}>
        <SettingsForm />
      </BottomSheet>
    </header>
  );
};

export default Header;