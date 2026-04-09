export const BUSINESS = {
  brand: import.meta.env.VITE_BUSINESS_BRAND || 'Sacramento Shuttle Service',
  phoneDisplay: import.meta.env.VITE_PHONE_DISPLAY || '(916) 000-0000',
  phoneRaw: import.meta.env.VITE_PHONE_RAW || '+19160000000',
  whatsappRaw: import.meta.env.VITE_WHATSAPP_RAW || '19160000000',
  email: import.meta.env.VITE_BUSINESS_EMAIL || 'aungoclan@yahoo.com',
  serviceArea: import.meta.env.VITE_SERVICE_AREA || 'Sacramento, California',
  bookingEndpoint:
    import.meta.env.VITE_BOOKING_ENDPOINT ||
    'https://script.google.com/macros/s/AKfycbyVacCBu9DJZrQdF5w3VJSw2_DKzK4OR33stLeywlkHN4KaEqp0Ct944QbB3nWSJ3M/exec',
}
