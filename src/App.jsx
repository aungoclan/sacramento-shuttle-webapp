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
} from 'lucide-react'
import { BUSINESS } from './config.js'

const COPY = {
  vi: {
    language: 'English',
    heroBadge: 'Dịch vụ xe đưa đón cao cấp tại Sacramento',
    heroTitle: 'Đưa đón sân bay riêng tư, đúng giờ và chuyên nghiệp tại Sacramento',
    heroDesc:
      'Phục vụ đưa đón SFO, SMF và các khu vực lân cận với phong cách lịch sự, xe sạch sẽ và tài xế thân thiện. Phù hợp cho đi sân bay, công tác, gia đình và khách cần dịch vụ đáng tin cậy mỗi ngày.',
    bookNow: 'Đặt xe ngay',
    viewServices: 'Xem dịch vụ',
    servicesTitle: 'Dịch vụ nổi bật',
    servicesDesc:
      'Tập trung vào trải nghiệm chuyên nghiệp, đúng giờ và thuận tiện cho khách đi sân bay hoặc di chuyển trong vùng Sacramento.',
    bookingSectionEyebrow: 'Booking',
    bookingSectionTitle: 'Đặt lịch hẹn trực tuyến',
    bookingSectionDesc:
      'Điền thông tin chuyến đi trong vài bước đơn giản. Chúng tôi sẽ xem lịch, xác nhận nhanh và liên hệ lại để bảo đảm chuyến đi của bạn thuận tiện, đúng giờ và rõ ràng về chi phí.',
    contactTab: 'Liên hệ nhanh',
    bookingTab: 'Đặt lịch',
    submittedTitle: 'Đã nhận yêu cầu đặt xe',
    submittedDesc:
      'Cảm ơn bạn. Chúng tôi sẽ kiểm tra lịch trình và liên hệ xác nhận chuyến đi trong thời gian sớm nhất.',
    sendAnother: 'Gửi yêu cầu khác',
    requestQuote: 'Nhận báo giá nhanh',
    estimate: 'Giá tham khảo',
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
      callDesc: 'Phù hợp khi cần đặt xe gấp hoặc cần xác nhận nhanh.',
      smsDesc: 'Tiện cho việc gửi giờ bay, địa chỉ đón và số hành khách.',
      whatsappDesc: 'Trao đổi nhanh, dễ gửi địa chỉ và lịch trình chuyến đi.',
      emailDesc: 'Thích hợp cho khách muốn nhận xác nhận và trao đổi chi tiết.',
    },
    stepsTitle: 'Vì sao khách chọn chúng tôi',
    steps: [
      'Đón đúng giờ, hỗ trợ lịch bay sáng sớm hoặc tối muộn',
      'Xe sạch sẽ, lịch sự, phù hợp cá nhân hoặc gia đình',
      'Phục vụ tận nơi tại Sacramento và các khu vực lân cận',
      'Liên hệ nhanh qua gọi điện, SMS, WhatsApp hoặc email',
      'Báo giá rõ ràng, xác nhận chuyến đi nhanh chóng',
    ],
    footerTitle: 'Phục vụ tận tâm cho từng hành trình',
    footerDesc:
      'Từ chuyến đi sân bay, công việc đến những chuyến đi gia đình, chúng tôi luôn ưu tiên sự đúng giờ, an toàn và trải nghiệm thoải mái cho khách hàng.',
    serviceCards: [
      {
        title: 'Đưa đón sân bay riêng',
        desc: 'Chuyên phục vụ Sacramento ↔ SFO, Sacramento ↔ SMF và các sân bay lân cận với lịch trình linh hoạt.',
      },
      {
        title: 'Đưa đón tận nơi',
        desc: 'Đón tại nhà, khách sạn, văn phòng hoặc điểm hẹn theo yêu cầu, bảo đảm thuận tiện và riêng tư.',
      },
      {
        title: 'Chuyến đi đặt trước',
        desc: 'Phù hợp cho công tác, gia đình, đi khám bệnh, sự kiện hoặc các chuyến đi cần sắp xếp trước.',
      },
    ],
    highlights: [
      'Đón đúng giờ, hỗ trợ theo lịch bay',
      'Phục vụ Sacramento, SFO, SMF và vùng lân cận',
      'Xe riêng, sạch sẽ, thoải mái',
      'Liên hệ nhanh và xác nhận sớm',
    ],
    errors: {
      missingEndpoint: 'Bạn chưa cấu hình bookingEndpoint.',
      invalidEndpoint: 'bookingEndpoint chưa đúng. Hãy dùng URL Google Apps Script kết thúc bằng /exec.',
      requestFailed:
        'Không gửi được booking. Hãy kiểm tra Apps Script đã deploy Web app, quyền Anyone, và URL /exec có đúng hay không.',
    },
  },
  en: {
    language: 'Tiếng Việt',
    heroBadge: 'Premium Sacramento Car Service',
    heroTitle: 'Private, punctual, and professional airport transportation in Sacramento',
    heroDesc:
      'Serving SFO, SMF, and nearby areas with clean vehicles, courteous drivers, and dependable service. Ideal for airport transfers, business travel, family rides, and anyone who values comfort and reliability.',
    bookNow: 'Book your ride',
    viewServices: 'View services',
    servicesTitle: 'Featured services',
    servicesDesc:
      'Focused on a premium experience, punctual pickup, and smooth transportation throughout Sacramento and nearby areas.',
    bookingSectionEyebrow: 'Booking',
    bookingSectionTitle: 'Book your ride online',
    bookingSectionDesc:
      'Complete your trip details in just a few simple steps. We will review your schedule, confirm availability, and follow up promptly so everything is clear, convenient, and on time.',
    contactTab: 'Quick contact',
    bookingTab: 'Booking',
    submittedTitle: 'Ride request received',
    submittedDesc:
      'Thank you. We will review your request and contact you shortly to confirm your trip details.',
    sendAnother: 'Send another request',
    requestQuote: 'Get a quick quote',
    estimate: 'Estimated fare',
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
      callDesc: 'Best for urgent bookings or immediate confirmation.',
      smsDesc: 'Convenient for sending your flight time, pickup address, and passenger count.',
      whatsappDesc: 'Quick and easy for sharing trip details and locations.',
      emailDesc: 'Ideal for detailed requests and written confirmation.',
    },
    stepsTitle: 'Why riders choose us',
    steps: [
      'Punctual pickup for early flights and late arrivals',
      'Clean, comfortable rides for individuals and families',
      'Door-to-door service across Sacramento and nearby areas',
      'Fast contact by phone, SMS, WhatsApp, or email',
      'Clear pricing and prompt confirmation',
    ],
    footerTitle: 'Carefully handled from pickup to drop-off',
    footerDesc:
      'From airport transfers to business and family travel, we focus on punctual service, safety, and a comfortable experience for every passenger.',
    serviceCards: [
      {
        title: 'Private airport transfers',
        desc: 'Serving Sacramento ↔ SFO, Sacramento ↔ SMF, and nearby airports with flexible scheduling.',
      },
      {
        title: 'Door-to-door pickup',
        desc: 'Pickup from home, hotel, office, or any requested location for a smooth and private ride experience.',
      },
      {
        title: 'Pre-scheduled rides',
        desc: 'Perfect for business trips, family travel, appointments, events, and planned transportation needs.',
      },
    ],
    highlights: [
      'On-time pickups based on your schedule',
      'Serving Sacramento, SFO, SMF, and nearby areas',
      'Clean and comfortable private rides',
      'Fast communication and confirmation',
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

function submitPayloadToEndpoint(payload, target = '_blank') {
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

export default function App() {
  const [lang, setLang] = useState('vi')
  const t = COPY[lang] || COPY.vi
  const successTimerRef = useRef(null)

  const [tripType, setTripType] = useState('one-way')
  const [pickupRegion, setPickupRegion] = useState('Sacramento')
  const [dropoffRegion, setDropoffRegion] = useState('SFO')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    if (!isConfiguredEndpoint(BUSINESS.bookingEndpoint)) {
      setSubmitError(t.errors.missingEndpoint)
      setSubmitting(false)
      return
    }

    if (!looksLikeAppsScriptExecUrl(BUSINESS.bookingEndpoint)) {
      setSubmitError(t.errors.invalidEndpoint)
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
      submitPayloadToEndpoint(payload, '_blank')
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

            <div className="card hero-booking-card">
              <div className="card-body">
                <div className="section-header">
                  <div className="icon-box"><Car size={24} /></div>
                  <div>
                    <h2>{t.bookingSectionTitle}</h2>
                    <p className="muted small">Nhanh chóng • Đáng tin cậy • 24/7</p>
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
                  <a href={callHref} className="contact-quick-link">
                    <Phone size={18} />
                    <div>{t.contact.call}</div>
                  </a>
                  <a href={smsHref} className="contact-quick-link">
                    <MessageCircle size={18} />
                    <div>{t.contact.sms}</div>
                  </a>
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="contact-quick-link">
                    <Send size={18} />
                    <div>{t.contact.whatsapp}</div>
                  </a>
                  <a href={emailHref} className="contact-quick-link">
                    <Mail size={18} />
                    <div>{t.contact.email}</div>
                  </a>
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

                    <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                      {submitting ? (lang === 'vi' ? 'Đang gửi...' : 'Sending...') : t.form.submit}
                    </button>
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
              <strong>{lang === 'vi' ? 'Liên hệ nhanh:' : 'Quick contact:'}</strong>
              <div className="endpoint-value">{BUSINESS.phoneDisplay}</div>
              <div>{BUSINESS.email}</div>
              <div className="top-gap-sm">
                {lang === 'vi'
                  ? 'Phục vụ Sacramento, SFO, SMF và các vùng lân cận.'
                  : 'Serving Sacramento, SFO, SMF, and nearby areas.'}
              </div>
            </div>
            <div className="stack top-gap-sm dark-list">
              <div>
                {lang === 'vi'
                  ? '• Đón đúng giờ, hỗ trợ chuyến bay sáng sớm và tối muộn'
                  : '• On-time pickup for early flights and late arrivals'}
              </div>
              <div>
                {lang === 'vi'
                  ? '• Xe riêng sạch sẽ, tài xế lịch sự và thân thiện'
                  : '• Clean private rides with courteous, friendly drivers'}
              </div>
              <div>
                {lang === 'vi'
                  ? '• Liên hệ nhanh và xác nhận chuyến đi rõ ràng'
                  : '• Fast communication and clear trip confirmation'}
              </div>
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


