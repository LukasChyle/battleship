import React from "react"
import { IntlProvider } from "react-intl"
import sv from "./languages/sv.json"
import en from "./languages/en.json"

const setLanguage = (locale) => {
    if (locale === "en") {
        return en
    }
    if (locale === "sv") {
        return sv
    }
    return en
}

export default function LanguageProvider({children, locale}) {
    const language = setLanguage(locale)
    return (
        <IntlProvider locale={locale} messages={language}>
            {children}
        </IntlProvider>
    )
}