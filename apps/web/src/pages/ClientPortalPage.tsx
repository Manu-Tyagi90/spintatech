import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ClientPortalPage() {
  const { t } = useTranslation()
  const [secret, setSecret] = useState('')
  const [authed, setAuthed] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')

  const fetchData = async () => {
    setError('')
    try {
      const res = await fetch('/api/client/dashboard', {
        headers: { 'x-client-secret': secret }
      })
      if (!res.ok) throw new Error('Unauthorized or error')
      setData((await res.json()).data)
      setAuthed(true)
    } catch {
      setError(t('client.error'))
      setAuthed(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{t('client.title')} | Spintatech Services</title>
      </Helmet>
      <div className="min-h-screen py-20 max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">{t('client.title')}</h1>
        {!authed && (
          <form
            onSubmit={e => {
              e.preventDefault()
              fetchData()
            }}
            className="mb-8 space-y-4 max-w-sm"
          >
            <Input
              type="password"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              placeholder={t('client.secret')}
              required
            />
            <Button type="submit">{t('client.login')}</Button>
            {error && <p className="text-red-600">{error}</p>}
          </form>
        )}
        {authed && data && (
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-semibold mb-2">{t('client.projects')}</h2>
              <ul className="list-disc ml-6">
                {data.projects.map((proj: any) => (
                  <li key={proj.name}>
                    <span className="font-semibold">{proj.name}</span> — {proj.status}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">{t('client.files')}</h2>
              <ul className="list-disc ml-6">
                {data.files.map((file: any) => (
                  <li key={file.name}>
                    <a href={file.url} className="text-primary underline" target="_blank" rel="noopener noreferrer">
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  )
}