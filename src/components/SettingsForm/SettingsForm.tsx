import { ChangeEventHandler } from "react";
import Switch from "../Switch/Switch";
import { useSettings } from "../../context/settingsContext";
import { useAnimation } from "../../hooks";
import styles from './SettingsForm.module.scss';

const SettingsForm = () => {
  const {font, theme, handleSetFont, handleSetTheme} = useSettings();

  const isDark = useAnimation(theme === 'dark', 50);

  const handleChangeFont: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newFont = e.target.value || font;
    handleSetFont(newFont);
  }

  const handleChangeTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    handleSetTheme(newTheme);
  }

  return (
    <div key={String(theme) + String(font)} className={styles['form']}>
      <div>
        <span>Тема приложения:</span>
        <Switch
          checked={!isDark}
          onChange={handleChangeTheme}
          className={styles['form__switcher']}
          label={
            <span className="material-symbols-outlined">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          }
        />
      </div>

      <div className={styles['form__radios']}>
        <span>Размер шрифта:</span>
        <div>
          <input
            type="radio"
            value='small'
            id="small"
            name="font"
            checked={font === 'small'}
            onChange={handleChangeFont}
          />
          <label htmlFor="small">Маленький</label>
        </div>

        <div>
          <input
            type="radio"
            value='regular'
            id="regular"
            name="font"
            checked={font === 'regular'}
            onChange={handleChangeFont}
          />
          <label htmlFor="regular">Обычный</label>
        </div>

        <div>
          <input
            type="radio"
            value='medium'
            id="medium"
            name="font"
            checked={font === 'medium'}
            onChange={handleChangeFont}
          />
          <label htmlFor="medium">Средний</label>
        </div>

        <div>
          <input
            type="radio"
            value='huge'
            id="huge"
            name="font"
            checked={font === 'huge'}
            onChange={handleChangeFont}
          />
          <label htmlFor="huge">Большой</label>
        </div>
      </div>
    </div>
  );
}

export default SettingsForm;