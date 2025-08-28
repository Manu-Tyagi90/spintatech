import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminPage() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language as 'en' | 'hi') || 'en'
  const [secret, setSecret] = useState('')
  const [authed, setAuthed] = useState(false)
  const [leads, setLeads] = useState<any[]>([])
  const [apps, setApps] = useState<any[]>([])
  const [error, setError] = useState('')

  const fetchData = async () => {
    setError('')
    try {
      const [leadsRes, appsRes] = await Promise.all([
        fetch('/api/admin/leads', { headers: { 'x-admin-secret': secret } }),
        fetch('/api/admin/applications', { headers: { 'x-admin-secret': secret } })
      ])
      if (!leadsRes.ok || !appsRes.ok) throw new Error('Unauthorized or error')
      setLeads((await leadsRes.json()).data)
      setApps((await appsRes.json()).data)
      setAuthed(true)
    } catch {
      setError(t('admin.error'))
      setAuthed(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{t('admin.title')} | Spintatech Services</title>
      </Helmet>
      <div className="min-h-screen py-20 max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">{t('admin.title')}</h1>
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
              placeholder={t('admin.secret')}
              required
            />
            <Button type="submit">{t('admin.login')}</Button>
            {error && <p className="text-red-600">{error}</p>}
          </form>
        )}
        {authed && (
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-semibold mb-2">{t('admin.leads')}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead>
                    <tr>
                      <th className="border px-2">{t('admin.name')}</th>
                      <th className="border px-2">{t('admin.email')}</th>
                      <th className="border px-2">{t('admin.message')}</th>
                      <th className="border px-2">{t('admin.date')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                        <tr key={lead._id || lead.email}>
                        <td className="border px-2">{lead.name}</td>
                        <td className="border px-2">{lead.email}</td>
                        <td className="border px-2">{lead.message}</td>
                        <td className="border px-2">{new Date(lead.createdAt).toLocaleString(lang)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">{t('admin.applications')}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead>
                    <tr>
                      <th className="border px-2">{t('admin.name')}</th>
                      <th className="border px-2">{t('admin.email')}</th>
                      <th className="border px-2">{t('admin.message')}</th>
                      <th className="border px-2">{t('admin.date')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apps.map((app) => (
                      <tr key={app._id || app.email}>
                        <td className="border px-2">{app.name}</td>
                        <td className="border px-2">{app.email}</td>
                        <td className="border px-2">{app.message}</td>
                        <td className="border px-2">{new Date(app.createdAt).toLocaleString(lang)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}