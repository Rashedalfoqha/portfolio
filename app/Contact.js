'use client';
import { useState } from "react";
import emailjs from "emailjs-com";
import Image from 'next/image';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = "service_wpohsl5";
    const templateId = "template_05hqb17";
    const userId = "znH3jKlhlPReHMYZa";

    const templateParams = {
      to_email: "rashedmohammadalfoqha@gmail.com",
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    emailjs.send(serviceId, templateId, templateParams, userId)
      .then(() => {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => {
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="section-container">
      <div className="text-center mb-[48px]">
        <h2 className="section-title">Get In Touch</h2>
        <p className="text-body max-w-[600px] mx-auto">
          Have a project in mind or want to discuss potential opportunities? I&rsquo;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
        <div className="lg:col-span-2 portfolio-card">
          <form onSubmit={handleSubmit} className="space-y-[24px]">
            {submitStatus === 'success' && (
              <div className="p-[16px] bg-green-50 text-green-700 rounded-[12px] font-semibold">
                Message sent successfully!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-[16px] bg-red-50 text-red-700 rounded-[12px] font-semibold">
                Something went wrong. Please try again.
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <div className="space-y-[8px]">
                <label className="text-[14px] font-bold text-[#1A1A2E]">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-[16px] py-[12px] bg-[#F0F2FF] border border-gray-200 rounded-[12px] focus:outline-none focus:border-[#6C3CE1]"
                />
              </div>
              <div className="space-y-[8px]">
                <label className="text-[14px] font-bold text-[#1A1A2E]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-[16px] py-[12px] bg-[#F0F2FF] border border-gray-200 rounded-[12px] focus:outline-none focus:border-[#6C3CE1]"
                />
              </div>
            </div>

            <div className="space-y-[8px]">
              <label className="text-[14px] font-bold text-[#1A1A2E]">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="w-full px-[16px] py-[12px] bg-[#F0F2FF] border border-gray-200 rounded-[12px] focus:outline-none focus:border-[#6C3CE1]"
              />
            </div>

            <div className="space-y-[8px]">
              <label className="text-[14px] font-bold text-[#1A1A2E]">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Your Message"
                className="w-full px-[16px] py-[12px] bg-[#F0F2FF] border border-gray-200 rounded-[12px] focus:outline-none focus:border-[#6C3CE1] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-[16px]"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="space-y-[24px]">
          <div className="portfolio-card">
            <h3 className="text-card-title mb-[16px]">Contact Info</h3>
            <div className="space-y-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#F0F2FF] rounded-full text-[#6C3CE1]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-[14px] text-[#6B7280]">rashedmohammadalfoqha@gmail.com</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#F0F2FF] rounded-full text-[#6C3CE1]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="text-[14px] text-[#6B7280]">+962 799 641 651</span>
              </div>
            </div>
          </div>

          <div className="portfolio-card bg-[#6C3CE1] text-white">
            <h3 className="text-[18px] font-bold mb-[16px] text-white">Socials</h3>
            <div className="flex gap-[12px]">
              <a href="https://github.com/Rashedalfoqha" target="_blank" rel="noopener noreferrer" className="w-[40px] h-[40px] flex items-center justify-center bg-white/20 rounded-[8px] hover:bg-white/30 transition-all">
                <Image src="https://www.svgrepo.com/show/475654/github-color.svg" alt="GitHub" width={20} height={20} />
              </a>
              <a href="https://www.linkedin.com/in/rashed-alfoqha/" target="_blank" rel="noopener noreferrer" className="w-[40px] h-[40px] flex items-center justify-center bg-white/20 rounded-[8px] hover:bg-white/30 transition-all">
                <Image src="https://www.svgrepo.com/show/452047/linkedin-1.svg" alt="LinkedIn" width={20} height={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}