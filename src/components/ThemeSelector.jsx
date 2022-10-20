import { useTheme } from '../hooks/useTheme'
import modeIcon from '../assets/mode-icon.svg'

// style
import './ThemeSelector.css'

const themeColors = ["#58249c", "#249c6b", "#b70233"]

export default function ThemeSelector() {

  const { changeColor, mode, changeMode } = useTheme()

  const toggleMode = () => {
    changeMode(mode === "light" ? "dark" : "light")
  }

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="Mode switch icon"
          onClick={toggleMode}
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map(color => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  )
}