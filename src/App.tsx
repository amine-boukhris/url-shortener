import { FormEvent, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

export default function App() {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    useEffect(() => {
        if (theme == 'dark') {
            document.getElementById('root')?.classList.add('dark')
        } else {
            document.getElementById('root')?.classList.remove('dark')
        }
    }, [theme])

    const toggleDarkMode = () => {
        if (theme == 'dark') {
            localStorage.setItem('theme', 'light')
            setTheme('light')
        } else {
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
        }
    }

    const submit = async (e: FormEvent) => {
        e.preventDefault()

        if (!url) return

        const options = {
            method: 'POST',
            url: 'https://url-shortener42.p.rapidapi.com/shorten/',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_X_RAPIDAPI_HOST,
            },
            data: {
                url,
                validity_duration: 5,
            },
        }

        try {
            const response = await axios.request(options)
            setShortUrl(response.data.url)
        } catch (error) {
            error instanceof Error
                ? toast.error(error.message)
                : toast.error('An error occured! Try again.')
        }
    }

    const copyUrl = () => {
        navigator.clipboard.writeText(shortUrl)
        toast.success('short url copied to clipboard')
    }

    const reset = () => {
        setShortUrl('')
        setUrl('')
    }

    return (
        <>
            <div className="min-h-screen w-full center flex-col gap-6 text-sm sm:text-xl px-6 text-gray-900 dark:text-gray-300 bg-gray-100 dark:bg-gray-900">
                <button
                    onClick={toggleDarkMode}
                    title={
                        theme === 'dark' ? 'use light theme' : 'use dark theme'
                    }
                >
                    {theme === 'dark' ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                            />
                        </svg>
                    )}
                </button>
                <div>
                    <Toaster />
                </div>
                <div className="relative border-2 border-gray-300 dark:border-gray-700 rounded-lg py-4 px-3 sm:p-6 max-w-2xl w-full">
                    <form onSubmit={submit}>
                        <label htmlFor="url" className="ml-2">
                            Enter URL to shorten
                        </label>
                        <div className="flex items-center mt-2">
                            <input
                                name="url"
                                type="url"
                                autoFocus
                                autoComplete="off"
                                required
                                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-l-lg box-border outline-none focus:border focus:border-gray-500 bg-gray-100 dark:bg-gray-800 "
                                placeholder="Enter Url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="p-4 text-gray-200 border-gray-200 dark:border-gray-700 bg-indigo-600 dark:bg-indigo-500 rounded-r-lg box-border"
                            >
                                Shorten
                            </button>
                        </div>
                    </form>
                    {shortUrl && (
                        <button
                            type="button"
                            title="reset"
                            className="absolute p-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 -top-3 -right-3 rounded-lg"
                            onClick={reset}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                        </button>
                    )}
                </div>
                {shortUrl && (
                    <div className="relative border-2 border-gray-300 dark:border-gray-700 rounded-lg py-4 px-3 sm:p-6 max-w-2xl w-full flex flex-col items-end gap-6">
                        <p className="w-full">{shortUrl}</p>
                        <button
                            type="button"
                            title="copy url"
                            className="absolute p-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 -top-3 -right-3 rounded-lg"
                            onClick={copyUrl}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
