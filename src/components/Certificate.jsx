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
      <nav
        className='flex items-center justify-between
                bg-gradient-to-r from-[#FF9933] via-white to-[#138808]
                px-6 py-3 shadow-md'
      >
        <div className='flex items-center gap-3'>
          <Bike className='h-8 w-8 text-[#000080]' />
          <h1 className='text-3xl font-bold text-[#000080]'>Chopda Cyclist</h1>
        </div>
      </nav>
      {/* Input */}
      <div className='flex flex-col items-center mt-6'>
        <label
          htmlFor='name'
          className='block mb-2 text-sm font-semibold text-[#000080]
             border-l-4 border-[#FF9933] pl-2'
        >
          Participant Name
        </label>
        <input
          id='name'
          type='text'
          placeholder='Enter Your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-80 px-4 py-3 rounded-xl shadow-sm
           border-2
           border-t-[#FF9933] border-l-[#FF9933]
           border-r-[#138808] border-b-[#138808]
           focus:outline-none focus:ring-2 focus:ring-[#000080]
           font-body text-lg text-[#000080] placeholder-gray-500
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
              src='/republicdaycertificate.png'
              alt='certificate'
              className='w-full h-full '
            />

            {/* Name Overlay */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <h2
                className='font-poppins font-bold uppercase tracking-wide
                 text-lg sm:text-xl md:text-3xl
                 bg-gradient-to-r from-[#FF9933] via-[#F5F5F5] to-[#138808]
                 bg-clip-text text-transparent text-center
                 whitespace-nowrap'
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top:
                    window.innerWidth < 640
                      ? "54%"
                      : window.innerWidth < 1024
                      ? "56%"
                      : "56%",
                  maxWidth: "95%",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                {name}
              </h2>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex gap-4'>
          <button
            onClick={downloadPNG}
            disabled={!name}
            className='w-40 md:w-80 px-6 py-3 rounded-xl font-semibold shadow-md
               bg-gradient-to-r from-[#FF9933] via-[#F5F5F5] to-[#138808]
               text-[#000080]
               hover:from-[#ff8c1a] hover:via-[#ffffff] hover:to-[#0f6f06]
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-all duration-300'
          >
            Download PNG
          </button>

          <button
            onClick={downloadPDF}
            disabled={!name}
            className='w-40 md:w-80 px-6 py-3 rounded-xl font-semibold shadow-md
               bg-gradient-to-r from-[#FF9933] via-[#F5F5F5] to-[#138808]
               text-[#000080]
               hover:from-[#ff8c1a] hover:via-[#ffffff] hover:to-[#0f6f06]
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
