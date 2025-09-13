import React, { useRef, useState } from "react"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import { Bike } from "lucide-react"
const Certificate = () => {
  const [name, setName] = useState("")
  const certRef = useRef(null)

  // Download PNG
  const downloadPNG = async () => {
    if (!certRef.current || !name) return
    const dataUrl = await toPng(certRef.current, {
      quality: 1.0,
      pixelRatio: 3,
    })
    const link = document.createElement("a")
    link.download = `${name}-certificate.png`
    link.href = dataUrl
    link.click()
  }

  // Download PDF
  //   const downloadPDF = async () => {
  //     if (!certRef.current || !name) return
  //     const dataUrl = await toPng(certRef.current, {
  //       quality: 1.0,
  //       pixelRatio: 3,
  //     })

  //     const pdf = new jsPDF("l", "pt", "a4")
  //     const imgProps = pdf.getImageProperties(dataUrl)
  //     const pdfWidth = pdf.internal.pageSize.getWidth()
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

  //     pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight)
  //     pdf.save(`${name}-certificate.pdf`)
  //   }
  // Download as PDF (Optimized)
  const downloadPDF = async () => {
    if (!certRef.current || !name) return

    // Use JPEG with compression
    const dataUrl = await toPng(certRef.current, {
      quality: 0.9, // lower quality slightly
      pixelRatio: 2, // reduce resolution
    })

    const pdf = new jsPDF("l", "pt", "a4") // landscape A4
    const imgProps = pdf.getImageProperties(dataUrl)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    // 👉 Save as JPEG (much smaller than PNG)
    pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight)
    pdf.save(`${name}-certificate.pdf`)
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='flex items-center justify-between bg-green-900 text-white px-6 py-3 shadow-md'>
        <div className='flex items-center gap-3'>
          {/* Cycling icon */}
          <Bike className='h-15 w-15 text-white' />

          <h1 className='text-3xl font-bold'>Chopda Cyclist</h1>
        </div>
      </nav>
      {/* Input */}
      <div className='flex flex-col items-center mt-6'>
        <label
          htmlFor='name'
          className='mb-2 text-lg font-semibold text-green-900'
        >
          Participant Name
        </label>
        <input
          id='name'
          type='text'
          placeholder='Enter Your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-80 px-4 py-3 border-2 border-green-700 rounded-xl shadow-sm
               focus:outline-none focus:ring-2 focus:ring-yellow-400 
               font-body text-lg text-gray-800 placeholder-gray-400
               transition-all duration-200'
        />
      </div>

      {/* Certificate */}
      <div className='flex flex-col items-center gap-6 p-8'>
        <div
          ref={certRef}
          className='relative w-[1024px] bg-white shadow-xl border rounded-xl overflow-hidden'
        >
          <img
            src='/chopdacyclistcer.png'
            alt='certificate'
            className='w-full h-auto'
          />

          {name && (
            <div className='absolute top-[42%] left-1/2 transform -translate-x-1/2 text-center'>
              {/* Inline font style here */}
              <h2
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "44px",
                  color: "#00554E",
                  fontWeight: "400C",
                  whiteSpace: "nowrap",
                  margin: "0 auto",
                }}
              >
                {name}
              </h2>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className='flex gap-4'>
          <button
            onClick={downloadPNG}
            disabled={!name}
            className='w-80 px-6 py-3 rounded-xl font-semibold shadow-md 
               bg-gradient-to-r from-green-800 to-yellow-500 text-white
               hover:from-green-700 hover:to-yellow-400 
               disabled:opacity-50 disabled:cursor-not-allowed 
               transition-all duration-300'
          >
            Download PNG
          </button>
          <button
            onClick={downloadPDF}
            disabled={!name}
            className='w-80 px-6 py-3 rounded-xl font-semibold shadow-md 
               bg-gradient-to-r from-green-800 to-yellow-500 text-white
               hover:from-green-700 hover:to-yellow-400 
               disabled:opacity-50 disabled:cursor-not-allowed 
               transition-all duration-300'
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default Certificate // ✅ don’t forget this
