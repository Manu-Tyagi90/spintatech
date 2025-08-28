import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const jobs = [
  {
    id: 'frontend-dev',
    title: {
      en: 'Frontend Developer (React)',
      hi: 'फ्रंटएंड डेवलपर (React)'
    },
    location: {
      en: 'Remote / Pune',
      hi: 'रिमोट / पुणे'
    },
    type: {
      en: 'Full Time',
      hi: 'पूर्णकालिक'
    },
    description: {
      en: 'Build modern, scalable UIs using React, TypeScript, and Tailwind CSS.',
      hi: 'React, TypeScript, और Tailwind CSS का उपयोग करके आधुनिक, स्केलेबल UI बनाएं।'
    }
  },
  {
    id: 'backend-dev',
    title: {
      en: 'Backend Developer (Node.js)',
      hi: 'बैकएंड डेवलपर (Node.js)'
    },
    location: {
      en: 'Remote / Pune',
      hi: 'रिमोट / पुणे'
    },
    type: {
      en: 'Full Time',
      hi: 'पूर्णकालिक'
    },
    description: {
      en: 'Develop robust APIs and microservices using Node.js, Express, and MongoDB.',
      hi: 'Node.js, Express, और MongoDB का उपयोग करके मजबूत API और माइक्रोसर्विसेज विकसित करें।'
    }
  }
]

export default function CareersPage() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language as 'en' | 'hi') || 'en'
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleApply = (jobId: string) => setSelectedJob(jobId)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob,
          ...form
        })
      })
      if (res.ok) {
        setIsSubmitting(false)
        setSubmitStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setIsSubmitting(false)
        setSubmitStatus('error')
      }
    } catch {
      setIsSubmitting(false)
      setSubmitStatus('error')
    }
  }

  return (
    <>
      <Helmet>
        <title>{t('careers.title')} | Spintatech Services</title>
        <meta name="description" content={t('careers.subtitle')} />
      </Helmet>
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('careers.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('careers.subtitle')}
            </p>
          </div>
          <div className="space-y-8 mb-16">
            {jobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-2">{job.title[lang]}</h2>
                <div className="text-sm text-gray-500 mb-2">
                  {job.location[lang]} • {job.type[lang]}
                </div>
                <p className="text-gray-600 mb-4">{job.description[lang]}</p>
                <Button onClick={() => handleApply(job.id)}>
                  {selectedJob === job.id ? t('careers.applying') : t('careers.apply')}
                </Button>
              </div>
            ))}
          </div>
          {selectedJob && (
            <div className="bg-gray-50 rounded-lg p-8 shadow max-w-lg mx-auto">
              <h2 className="text-xl font-bold mb-4">
                {t('careers.apply')} : {jobs.find(j => j.id === selectedJob)?.title[lang]}
              </h2>
              {submitStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800">{t('careers.form.success')}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('careers.form.name')}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('careers.form.email')}
                  required
                />
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('careers.form.message')}
                  rows={4}
                  required
                />
                <div className="flex gap-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t('careers.form.submitting') : t('careers.form.submit')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setSelectedJob(null)}>
                    {t('careers.form.cancel')}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}