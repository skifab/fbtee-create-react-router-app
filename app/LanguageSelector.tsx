import { useLocation, useNavigate } from "react-router"
import { useLocaleContext } from "~/hooks"

export function LanguageSelector() {
  const location = useLocation()
  const navigate = useNavigate()
  const { locale, availableLanguages } = useLocaleContext()

  const changeLanguage = (lang: string): void => {
    const query = new URLSearchParams(location.search)
    query.set("lang", lang)
    navigate({pathname: location.pathname, search: query.toString()})
  }

  return (
    <div className="language-selector">
        <div className="flex flex-row flex-wrap gap-2">
          {Array.from(availableLanguages.entries()).map(([lang, name]) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`px-3 py-1 rounded-md text-sm transition-colors cursor-pointer ${locale === lang
                  ? "bg-blue-600 text-white border-2"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                }`}
            >
              {name}
            </button>
          ))}
        </div>
    </div>
  )
}
