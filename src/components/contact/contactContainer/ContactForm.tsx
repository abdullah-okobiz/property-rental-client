"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { Input, message, Button ,Flex} from 'antd';
import { contactSubmitFormApi } from '@/services/contact';

const { TextArea } = Input;


interface ContactFormValues {
  firstName: string;
  subject: string;
  email: string;
  phone: string;
  message: string;
}

const initialFormValues: ContactFormValues = {
  firstName: '',
  subject: '',
  email: '',
  phone: '',
  message: '',
};

const ContactForm = () => {
  const [formValues, setFormValues] = useState<ContactFormValues>(initialFormValues);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
   
    const formData = new FormData();
    formData.append('name', formValues.firstName);
    formData.append('subject', formValues.subject);
    formData.append('email', formValues.email);
    formData.append('phone', formValues.phone);
    formData.append('message', formValues.message);
   
    try {
       const result = await contactSubmitFormApi(formData)
       console.log("result ", result)

       if (result.ok) {
        message.success( 'Message sent successfully!');
        setFormValues(initialFormValues);
      } else {
        message.error('Something went wrong!');
      }
    } catch (error) {
      message.error('Network error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
       <Flex vertical gap={20}>
      <div className='grid grid-cols-2 gap-4 mb-5 bg-[#FFFFFF]  py-10 px-4 md:px-8"'>
        <Input
          name="firstName"
          placeholder="Name"
          value={formValues.firstName}
          onChange={handleChange}
          variant="underlined"
        />
        <Input
          name="subject"
          placeholder="Subject"
          value={formValues.subject}
          onChange={handleChange}
          variant="underlined"
        />
        <Input
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
          variant="underlined"
        />
        <Input
          name="phone"
          placeholder="Phone Number"
          value={formValues.phone}
          onChange={handleChange}
          variant="underlined"
        />
        <div className="col-span-2">
          <TextArea
            name="message"
            maxLength={100}
            placeholder="Send Message"
            value={formValues.message}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className='bg-primary'
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
      </Flex>
    </form>
  );
};

export default ContactForm;
