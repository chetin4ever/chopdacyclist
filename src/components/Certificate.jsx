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
        <div className='w-full max-w-full flex justify-center'>
          <div
            ref={certRef}
            className='relative w-full max-w-[1024px] aspect-[4/3] bg-white  overflow-hidden'
          >
            {/* Background certificate image */}
            <img
              src='/chopdacyclistcer.png'
              alt='certificate'
              className='w-full h-full object-contain'
            />

            {/* Name Overlay */}
            {name && (
              <div className='absolute top-[44%] left-1/2 -translate-x-1/2 whitespace-nowrap text-center px-2'>
                <h2
                  className='text-base sm:text-xl md:text-2xl lg:text-4xl font-fancy'
                  style={{ color: "#006400" }}
                >
                  {name}
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className='flex gap-4'>
          <button
            onClick={downloadPNG}
            disabled={!name}
            className='w-40 md:w-80 px-6 py-3 rounded-xl font-semibold shadow-md 
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
            className='w-40 md:w-80 px-6 py-3 rounded-xl font-semibold shadow-md 
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
