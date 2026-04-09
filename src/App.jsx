import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Car,
  Plane,
  CalendarDays,
  Phone,
  MapPin,
  CheckCircle2,
  MessageCircle,
  Shield,
  Navigation,
  Users,
  Mail,
  Languages,
  Send,
  FlaskConical,
} from 'lucide-react'
import { BUSINESS } from './config.js'

const COPY = {
  vi: {
    language: 'Tiếng Việt',
    heroBadge: 'Dịch vụ đưa rước Sacramento',
    heroTitle: 'Đưa rước sân bay và vùng lân cận tại Sacramento',
    heroDesc:
      'Web app song ngữ Việt - Anh cho dịch vụ đưa rước của bạn, có trang đặt lịch nổi bật, nút gọi nhanh, SMS, WhatsApp, và gửi booking vào Google Sheets + email thông báo.',
    bookNow: 'Đặt lịch ngay',
    viewServices: 'Xem dịch vụ',
    servicesTitle: 'Dịch vụ chính',
    servicesDesc: 'Thiết kế tập trung vào khách cần đặt xe nhanh và dễ dùng trên điện thoại.',
    bookingSectionEyebrow: 'Booking',
    bookingSectionTitle: 'Đặt lịch hẹn trực tuyến',
    bookingSectionDesc:
      'Khi khách gửi form, dữ liệu có thể được lưu vào Google Sheets, đồng thời gửi email thông báo về cho bạn. Bản này dùng form POST để tương thích tốt hơn với Google Apps Script.',
    contactTab: 'Liên hệ nhanh',
    bookingTab: 'Đặt lịch',
    submittedTitle: 'Đã gửi yêu cầu đặt lịch',
    submittedDesc:
      'Yêu cầu đã được gửi sang backend. Nếu tab mới trả về ok:true thì booking sẽ được lưu vào Google Sheets và gửi email thông báo cho bạn.',
    sendAnother: 'Gửi yêu cầu mới',
    requestQuote: 'Yêu cầu báo giá',
    estimate: 'Ước tính giá chuyến',
    testSubmit: 'Test booking submit',
    testSubmitting: 'Đang test...',
    testSuccess: 'Đã gửi booking test. Hãy kiểm tra Google Sheet và email.',
    testDescription: 'Nút này gửi một booking mẫu để bạn xác nhận backend có nhận POST hay không.',
    form: {
      fullName: 'Họ và tên',
      phone: 'Số điện thoại',
      email: 'Email',
      tripType: 'Loại chuyến',
      passengers: 'Số hành khách',
      pickupAddress: 'Địa chỉ đón',
      dropoffAddress: 'Địa chỉ trả',
      date: 'Ngày đón',
      time: 'Giờ đón',
      bags: 'Số hành lý',
      flightNumber: 'Số hiệu chuyến bay',
      notes: 'Ghi chú thêm',
      submit: 'Gửi yêu cầu đặt lịch',
      oneWay: 'Một chiều',
      roundTrip: 'Khứ hồi',
      hourly: 'Thuê theo giờ',
    },
    contact: {
      call: 'Gọi điện',
      sms: 'Nhắn SMS',
      whatsapp: 'WhatsApp',
      email: 'Email',
      callDesc: 'Khách có thể gọi trực tiếp để đặt chuyến gấp.',
      smsDesc: 'Khách gửi tin nhắn nhanh để hỏi giá và giờ đón.',
      whatsappDesc: 'Phù hợp khách thích chat nhanh, gửi địa chỉ và thời gian.',
      emailDesc: 'Nhận booking và báo giá qua email.',
    },
    stepsTitle: 'Web app này đã làm được gì',
    steps: [
      'Form đặt lịch song ngữ Việt - Anh',
      'Sẵn cấu trúc gửi dữ liệu vào Google Sheets',
      'Sẵn cấu trúc gửi email thông báo',
      'Có nút gọi điện, SMS, WhatsApp, email',
      'Sẵn sàng deploy Railway',
    ],
    footerTitle: 'Kết nối backend bằng Google Apps Script',
    footerDesc:
      'Bạn chỉ cần thay bookingEndpoint bằng URL Google Apps Script của mình. Apps Script sẽ nhận dữ liệu từ website, lưu vào Google Sheets và gửi email thông báo cho bạn.',
    serviceCards: [
      {
        title: 'Đưa rước sân bay',
        desc: 'Chuyên tuyến Sacramento ↔ SFO, Sacramento ↔ SMF và các sân bay lân cận.',
      },
      {
        title: 'Đưa đón tận nơi',
        desc: 'Đón tại nhà, khách sạn, công ty và trả khách đúng điểm hẹn theo yêu cầu.',
      },
      {
        title: 'Chuyến đi theo lịch',
        desc: 'Đặt trước cho công việc, gia đình, đi khám bệnh hoặc đi chơi vùng lân cận.',
      },
    ],
    highlights: [
      'Phục vụ Sacramento và vùng lân cận',
      'Nhận chuyến SFO, SMF, Napa, San Jose...',
      'Đặt lịch trước nhanh chóng',
      'Xe riêng, linh hoạt giờ giấc',
    ],
    errors: {
      missingEndpoint: 'Bạn chưa cấu hình bookingEndpoint.',
      invalidEndpoint: 'bookingEndpoint chưa đúng. Hãy dùng URL Google Apps Script kết thúc bằng /exec.',
      requestFailed:
        'Không gửi được booking. Hãy kiểm tra Apps Script đã deploy Web app, quyền Anyone, và URL /exec có đúng hay không.',
    },
  },
  en: {
    language: 'English',
    heroBadge: 'Sacramento Ride Service',
    heroTitle: 'Airport and local ride service in Sacramento',
    heroDesc:
      'A bilingual Vietnamese-English web app for your shuttle business, with online booking, click-to-call, SMS, WhatsApp, and booking delivery to Google Sheets plus email notifications.',
    bookNow: 'Book now',
    viewServices: 'View services',
    servicesTitle: 'Main services',
    servicesDesc: 'Designed for fast booking and easy mobile use.',
    bookingSectionEyebrow: 'Booking',
    bookingSectionTitle: 'Online booking form',
    bookingSectionDesc:
      'When a customer submits the form, the data can be saved to Google Sheets and an email notification can be sent to you. This version uses direct POST for better Google Apps Script compatibility.',
    contactTab: 'Quick contact',
    bookingTab: 'Booking',
    submittedTitle: 'Booking request sent',
    submittedDesc:
      'Your request was sent to the backend. If the new tab returns ok:true, the booking should be saved to Google Sheets and trigger an email notification automatically.',
    sendAnother: 'Send another request',
    requestQuote: 'Request quote',
    estimate: 'Estimated fare',
    testSubmit: 'Test booking submit',
    testSubmitting: 'Testing...',
    testSuccess: 'Test booking sent. Please check your Google Sheet and email.',
    testDescription: 'This button sends a sample booking so you can confirm the backend receives POST requests.',
    form: {
      fullName: 'Full name',
      phone: 'Phone number',
      email: 'Email',
      tripType: 'Trip type',
      passengers: 'Passengers',
      pickupAddress: 'Pickup address',
      dropoffAddress: 'Dropoff address',
      date: 'Pickup date',
      time: 'Pickup time',
      bags: 'Bags',
      flightNumber: 'Flight number',
      notes: 'Additional notes',
      submit: 'Send booking request',
      oneWay: 'One-way',
      roundTrip: 'Round trip',
      hourly: 'Hourly service',
    },
    contact: {
      call: 'Call',
      sms: 'SMS',
      whatsapp: 'WhatsApp',
      email: 'Email',
      callDesc: 'Customers can call directly for urgent rides.',
      smsDesc: 'Fast texting for quote and pickup time.',
      whatsappDesc: 'Great for quick chat, addresses, and trip details.',
      emailDesc: 'Receive bookings and quotes by email.',
    },
    stepsTitle: 'What this web app already includes',
    steps: [
      'Bilingual Vietnamese-English booking form',
      'Ready structure for Google Sheets saving',
      'Ready structure for email notifications',
      'Call, SMS, WhatsApp, and email buttons',
      'Ready for Railway deployment',
    ],
    footerTitle: 'Backend connection with Google Apps Script',
    footerDesc:
      'You only need to replace bookingEndpoint with your Google Apps Script URL. The script will receive website data, save it into Google Sheets, and send you an email notification.',
    serviceCards: [
      {
        title: 'Airport rides',
        desc: 'Main routes for Sacramento ↔ SFO, Sacramento ↔ SMF, and nearby airports.',
      },
      {
        title: 'Door-to-door pickup',
        desc: 'Pickup from home, hotel, office, and drop off exactly where needed.',
      },
      {
        title: 'Scheduled rides',
        desc: 'Pre-book for work, family, medical visits, and nearby trips.',
      },
    ],
    highlights: [
      'Serving Sacramento and nearby areas',
      'Trips to SFO, SMF, Napa, San Jose...',
      'Fast advance booking',
      'Private rides with flexible timing',
    ],
    errors: {
      missingEndpoint: 'bookingEndpoint is not configured.',
      invalidEndpoint: 'bookingEndpoint is invalid. Use the deployed Google Apps Script URL ending with /exec.',
      requestFailed:
        'Booking could not be sent. Please verify your Apps Script is deployed as a Web app, access is set to Anyone, and the /exec URL is correct.',
    },
  },
}

const initialFormState = {
  fullName: '',
  phone: '',
  email: '',
  pickupAddress: '',
  dropoffAddress: '',
  date: '',
  time: '',
  passengers: '1',
  bags: '1',
  flightNumber: '',
  notes: '',
}

function isConfiguredEndpoint(url) {
  return Boolean(url && !url.includes('REPLACE_WITH') && url.startsWith('http'))
}

function looksLikeAppsScriptExecUrl(url) {
  return /script\.google\.com\/macros\/s\/.+\/exec$/i.test(url || '')
}

function buildPayload({ lang, tripType, pickupRegion, dropoffRegion, form }) {
  return {
    business: BUSINESS.brand,
    language: lang,
    tripType,
    pickupRegion,
    dropoffRegion,
    createdAt: new Date().toISOString(),
    ...form,
  }
}

function toFormEntries(payload) {
  return Object.entries(payload).map(([key, value]) => [key, value == null ? '' : String(value)])
}

function SubmitButton({ children, ...props }) {
  return (
    <button className="btn btn-primary btn-full" {...props}>
      {children}
    </button>
  )
}

function IconButtonLink({ href, children, external = false }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="contact-quick-link"
    >
      {children}
    </a>
  )
}

export default function App() {
  const [lang, setLang] = useState('vi')
  const t = COPY[lang]
  const successTimerRef = useRef(null)

  const [tripType, setTripType] = useState('one-way')
  const [pickupRegion, setPickupRegion] = useState('Sacramento')
  const [dropoffRegion, setDropoffRegion] = useState('SFO')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [testSubmitting, setTestSubmitting] = useState(false)
  const [testStatus, setTestStatus] = useState('')
  const [activeTab, setActiveTab] = useState('booking')
  const [form, setForm] = useState(initialFormState)

  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current)
    }
  }, [])

  const fareHint = useMemo(() => {
    const key = `${pickupRegion}-${dropoffRegion}`
    const map = {
      'Sacramento-SFO': '$220 - $280',
      'Sacramento-SMF': '$55 - $95',
      'Sacramento-Elk Grove': '$50 - $80',
      'Sacramento-Roseville': '$55 - $85',
      'Sacramento-Davis': '$60 - $95',
      'Sacramento-Napa': '$180 - $250',
      'Sacramento-San Jose': '$230 - $300',
    }
    return map[key] || (lang === 'vi' ? 'Giá sẽ được xác nhận sau' : 'Fare will be confirmed later')
  }, [pickupRegion, dropoffRegion, lang])

  const handleInput = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetForm = () => {
    setForm(initialFormState)
    setTripType('one-way')
    setSubmitted(false)
    setSubmitError('')
    setTestStatus('')
  }

  const submitPayloadToEndpoint = async (payload, target = '_blank') => {
    const formEl = document.createElement('form')
    formEl.method = 'POST'
    formEl.action = BUSINESS.bookingEndpoint
    formEl.target = target
    formEl.style.display = 'none'

    toFormEntries(payload).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value
      formEl.appendChild(input)
    })

    document.body.appendChild(formEl)
    formEl.submit()
    formEl.remove()
  }

  const validateEndpointOrSetError = () => {
    if (!isConfiguredEndpoint(BUSINESS.bookingEndpoint)) {
      setSubmitError(t.errors.missingEndpoint)
      return false
    }

    if (!looksLikeAppsScriptExecUrl(BUSINESS.bookingEndpoint)) {
      setSubmitError(t.errors.invalidEndpoint)
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    setTestStatus('')

    if (!validateEndpointOrSetError()) {
      setSubmitting(false)
      return
    }

    const payload = buildPayload({
      lang,
      tripType,
      pickupRegion,
      dropoffRegion,
      form,
    })

    try {
      await submitPayloadToEndpoint(payload, '_blank')
      successTimerRef.current = setTimeout(() => {
        setSubmitted(true)
        setSubmitting(false)
      }, 400)
    } catch (error) {
      console.error('Booking submission failed:', error)
      setSubmitError(t.errors.requestFailed)
      setSubmitting(false)
    }
  }

  const handleTestSubmit = async () => {
    setTestSubmitting(true)
    setSubmitError('')
    setTestStatus('')

    if (!validateEndpointOrSetError()) {
      setTestSubmitting(false)
      return
    }

    const now = new Date()
    const testPayload = buildPayload({
      lang,
      tripType: 'one-way',
      pickupRegion: 'Sacramento',
      dropoffRegion: 'SMF',
      form: {
        fullName: 'TEST BOOKING - WEB APP',
        phone: '+19165550000',
        email: BUSINESS.email,
        pickupAddress: 'Sacramento Test Pickup',
        dropoffAddress: 'SMF Terminal A',
        date: now.toISOString().slice(0, 10),
        time: now.toTimeString().slice(0, 5),
        passengers: '1',
        bags: '1',
        flightNumber: 'TEST123',
        notes: 'This is an automatic test booking from the website button.',
      },
    })

    try {
      await submitPayloadToEndpoint(testPayload, '_blank')
      setTestStatus(t.testSuccess)
    } catch (error) {
      console.error('Test booking submission failed:', error)
      setSubmitError(t.errors.requestFailed)
    } finally {
      setTestSubmitting(false)
    }
  }

  const callHref = `tel:${BUSINESS.phoneRaw}`
  const smsHref = `sms:${BUSINESS.phoneRaw}`
  const whatsappMessage = encodeURIComponent(
    lang === 'vi' ? 'Chào anh/chị, tôi muốn đặt xe đưa rước.' : 'Hello, I would like to book a ride.',
  )
  const whatsappHref = `https://wa.me/${BUSINESS.whatsappRaw}?text=${whatsappMessage}`
  const emailHref = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
    lang === 'vi' ? 'Yêu cầu đặt xe' : 'Ride booking request',
  )}`

  const serviceIcons = [Plane, Navigation, CalendarDays]

  return (
    <div className="app-shell">
      <section className="hero">
        <div className="hero-gradient" />
        <div className="container hero-inner">
          <div className="topbar">
            <div>
              <div className="brand">{BUSINESS.brand}</div>
              <div className="muted">{BUSINESS.serviceArea}</div>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setLang((prev) => (prev === 'vi' ? 'en' : 'vi'))}
            >
              <Languages size={16} />
              {t.language}
            </button>
          </div>

          <div className="hero-grid">
            <div>
              <span className="badge">{t.heroBadge}</span>
              <h1 className="hero-title">{t.heroTitle}</h1>
              <p className="hero-copy">{t.heroDesc}</p>

              <div className="hero-actions">
                <a href="#booking" className="btn btn-primary">{t.bookNow}</a>
                <a href="#services" className="btn btn-outline">{t.viewServices}</a>
              </div>

              <div className="highlights-grid">
                {t.highlights.map((item) => (
                  <div key={item} className="highlight-card">
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card hero-booking-card">
                <div className="card-body">
                  <div className="section-header">
                    <div className="icon-box"><Car size={24} /></div>
                    <div>
                      <h2>{t.bookingSectionTitle}</h2>
                      <p className="muted small">Google Sheets + Email Ready</p>
                    </div>
                  </div>

                  <div className="grid two">
                    <div>
                      <label>{lang === 'vi' ? 'Điểm đón' : 'Pickup region'}</label>
                      <select value={pickupRegion} onChange={(e) => setPickupRegion(e.target.value)}>
                        <option value="Sacramento">Sacramento</option>
                        <option value="Elk Grove">Elk Grove</option>
                        <option value="Roseville">Roseville</option>
                        <option value="Davis">Davis</option>
                      </select>
                    </div>

                    <div>
                      <label>{lang === 'vi' ? 'Điểm đến' : 'Destination'}</label>
                      <select value={dropoffRegion} onChange={(e) => setDropoffRegion(e.target.value)}>
                        <option value="SFO">SFO</option>
                        <option value="SMF">SMF</option>
                        <option value="Napa">Napa</option>
                        <option value="San Jose">San Jose</option>
                        <option value="Elk Grove">Elk Grove</option>
                        <option value="Roseville">Roseville</option>
                        <option value="Davis">Davis</option>
                      </select>
                    </div>
                  </div>

                  <div className="fare-box">
                    <div>
                      <p className="muted small">{t.estimate}</p>
                      <p className="fare-value">{fareHint}</p>
                    </div>
                    <button type="button" className="btn btn-primary">{t.requestQuote}</button>
                  </div>

                  <div className="quick-links-grid">
                    <IconButtonLink href={callHref}>
                      <Phone size={18} />
                      <div>{t.contact.call}</div>
                    </IconButtonLink>
                    <IconButtonLink href={smsHref}>
                      <MessageCircle size={18} />
                      <div>{t.contact.sms}</div>
                    </IconButtonLink>
                    <IconButtonLink href={whatsappHref} external>
                      <Send size={18} />
                      <div>{t.contact.whatsapp}</div>
                    </IconButtonLink>
                    <IconButtonLink href={emailHref}>
                      <Mail size={18} />
                      <div>{t.contact.email}</div>
                    </IconButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-copy">
            <p className="eyebrow">Services</p>
            <h2>{t.servicesTitle}</h2>
            <p className="muted">{t.servicesDesc}</p>
          </div>

          <div className="cards-grid">
            {t.serviceCards.map((service, index) => {
              const Icon = serviceIcons[index]
              return (
                <div key={service.title} className="card">
                  <div className="card-body">
                    <div className="icon-box"><Icon size={24} /></div>
                    <h3>{service.title}</h3>
                    <p className="muted body-copy">{service.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mini-cards-grid top-gap">
            {[
              ['SFO Airport', 'Phù hợp khách đi/đến San Francisco International Airport'],
              ['SMF Airport', 'Chuyến ngắn trong vùng Sacramento International Airport'],
              ['Các vùng lân cận', 'Roseville, Elk Grove, Davis, Napa, San Jose...'],
            ].map(([title, desc]) => (
              <div key={title} className="mini-card">
                <div className="mini-card-header">
                  <MapPin size={18} />
                  <h4>{title}</h4>
                </div>
                <p className="muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="section section-alt">
        <div className="container booking-grid">
          <div>
            <p className="eyebrow">{t.bookingSectionEyebrow}</p>
            <h2>{t.bookingSectionTitle}</h2>
            <p className="muted body-copy">{t.bookingSectionDesc}</p>

            <div className="stack top-gap">
              {t.steps.map((item) => (
                <div key={item} className="step-card">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="card top-gap">
              <div className="card-body">
                <div className="section-header">
                  <div className="icon-box"><FlaskConical size={20} /></div>
                  <div className="grow">
                    <h3>{t.testSubmit}</h3>
                    <p className="muted small">{t.testDescription}</p>
                    {testStatus ? <div className="success-box top-gap-sm">{testStatus}</div> : null}
                    <button
                      type="button"
                      className="btn btn-primary top-gap-sm"
                      onClick={handleTestSubmit}
                      disabled={testSubmitting}
                    >
                      <FlaskConical size={16} />
                      {testSubmitting ? t.testSubmitting : t.testSubmit}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card booking-card">
            <div className="card-body">
              <div className="tabs">
                <button
                  type="button"
                  className={`tab ${activeTab === 'booking' ? 'active' : ''}`}
                  onClick={() => setActiveTab('booking')}
                >
                  {t.bookingTab}
                </button>
                <button
                  type="button"
                  className={`tab ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  {t.contactTab}
                </button>
              </div>

              {activeTab === 'booking' ? (
                !submitted ? (
                  <form onSubmit={handleSubmit} className="stack top-gap">
                    <div className="grid two">
                      <div>
                        <label>{t.form.fullName}</label>
                        <input
                          value={form.fullName}
                          onChange={(e) => handleInput('fullName', e.target.value)}
                          placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'John Nguyen'}
                          required
                        />
                      </div>
                      <div>
                        <label>{t.form.phone}</label>
                        <input
                          value={form.phone}
                          onChange={(e) => handleInput('phone', e.target.value)}
                          placeholder="(916) 000-0000"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label>{t.form.email}</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleInput('email', e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="grid two">
                      <div>
                        <label>{t.form.tripType}</label>
                        <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
                          <option value="one-way">{t.form.oneWay}</option>
                          <option value="round-trip">{t.form.roundTrip}</option>
                          <option value="hourly">{t.form.hourly}</option>
                        </select>
                      </div>
                      <div>
                        <label>{t.form.passengers}</label>
                        <select value={form.passengers} onChange={(e) => handleInput('passengers', e.target.value)}>
                          {['1', '2', '3', '4', '5+'].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label>{t.form.pickupAddress}</label>
                      <input
                        value={form.pickupAddress}
                        onChange={(e) => handleInput('pickupAddress', e.target.value)}
                        placeholder={lang === 'vi' ? 'Ví dụ: South Sacramento, CA' : 'Example: South Sacramento, CA'}
                        required
                      />
                    </div>

                    <div>
                      <label>{t.form.dropoffAddress}</label>
                      <input
                        value={form.dropoffAddress}
                        onChange={(e) => handleInput('dropoffAddress', e.target.value)}
                        placeholder={lang === 'vi' ? 'Ví dụ: SFO Terminal 3' : 'Example: SFO Terminal 3'}
                        required
                      />
                    </div>

                    <div className="grid two">
                      <div>
                        <label>{t.form.date}</label>
                        <input type="date" value={form.date} onChange={(e) => handleInput('date', e.target.value)} required />
                      </div>
                      <div>
                        <label>{t.form.time}</label>
                        <input type="time" value={form.time} onChange={(e) => handleInput('time', e.target.value)} required />
                      </div>
                    </div>

                    <div className="grid two">
                      <div>
                        <label>{t.form.bags}</label>
                        <select value={form.bags} onChange={(e) => handleInput('bags', e.target.value)}>
                          {['0', '1', '2', '3', '4+'].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label>{t.form.flightNumber}</label>
                        <input
                          value={form.flightNumber}
                          onChange={(e) => handleInput('flightNumber', e.target.value)}
                          placeholder="UA 1234"
                        />
                      </div>
                    </div>

                    <div>
                      <label>{t.form.notes}</label>
                      <textarea
                        rows="5"
                        value={form.notes}
                        onChange={(e) => handleInput('notes', e.target.value)}
                        placeholder={
                          lang === 'vi'
                            ? 'Ví dụ: cần ghế trẻ em, có người lớn tuổi, nhiều hành lý...'
                            : 'Example: child seat needed, senior passenger, extra luggage...'
                        }
                      />
                    </div>

                    {submitError ? <div className="error-box">{submitError}</div> : null}

                    <SubmitButton type="submit" disabled={submitting}>
                      {submitting ? (lang === 'vi' ? 'Đang gửi...' : 'Sending...') : t.form.submit}
                    </SubmitButton>
                  </form>
                ) : (
                  <div className="success-panel">
                    <CheckCircle2 size={48} />
                    <h3>{t.submittedTitle}</h3>
                    <p>{t.submittedDesc}</p>
                    <button type="button" className="btn btn-outline top-gap-sm" onClick={resetForm}>
                      {t.sendAnother}
                    </button>
                  </div>
                )
              ) : (
                <div className="stack top-gap">
                  {[
                    {
                      title: t.contact.call,
                      desc: t.contact.callDesc,
                      href: callHref,
                      icon: Phone,
                    },
                    {
                      title: t.contact.sms,
                      desc: t.contact.smsDesc,
                      href: smsHref,
                      icon: MessageCircle,
                    },
                    {
                      title: t.contact.whatsapp,
                      desc: t.contact.whatsappDesc,
                      href: whatsappHref,
                      icon: Send,
                      external: true,
                    },
                    {
                      title: t.contact.email,
                      desc: t.contact.emailDesc,
                      href: emailHref,
                      icon: Mail,
                    },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noreferrer' : undefined}
                        className="contact-card"
                      >
                        <div className="contact-card-inner">
                          <Icon size={18} />
                          <div>
                            <div className="contact-title">{item.title}</div>
                            <div className="muted">{item.desc}</div>
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section footer-section">
        <div className="container footer-grid">
          <div>
            <h2>{t.stepsTitle}</h2>
            <div className="cards-grid top-gap">
              {t.steps.map((item) => (
                <div key={item} className="card">
                  <div className="card-body">
                    <h3 className="medium-title">{item}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dark-card">
            <h3>{t.footerTitle}</h3>
            <p>{t.footerDesc}</p>
            <div className="endpoint-box">
              <strong>Endpoint:</strong>
              <div className="endpoint-value">{BUSINESS.bookingEndpoint}</div>
            </div>
            <div className="stack top-gap-sm dark-list">
              <div>• Replace phone, email, and WhatsApp with your real business info</div>
              <div>• Connect to Google Sheets and Gmail through Apps Script</div>
              <div>• Deploy on Railway</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section last-strip">
        <div className="container small-features-grid">
          {[
            { icon: Shield, text: 'Safe & private rides' },
            { icon: Users, text: 'Family-friendly service' },
            { icon: Navigation, text: 'Door-to-door pickup' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="mini-feature">
              <Icon size={18} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
