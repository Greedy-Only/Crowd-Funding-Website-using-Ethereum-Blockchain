import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateRequest = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createRequest } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exits) => {
      if (exits) {
        setIsLoading(true)
        await createRequest({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
        setIsLoading(false);
        navigate('/');
      }
      else {
        alert('Provide a valid image URL')
        setForm({ ...form, image: '' });
      }
    })

  }
  return (
    <div className='bg-[#301934] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4' >
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[14px] sm:min-w[360px] bg-[#1dc071] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create a Request</h1></div>

      <form onSubmit={handleSubmit} className="w-full mt-[60px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px] text-white">
          <FormField
            LableName="Your Name *"
            placeholder="Astha Negi"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />


          <FormField
            LableName="Donation title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          LableName="Story"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />
        {/* <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount </h4>
        </div> */}
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            LableName="Goal *"
            placeholder="Ether 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />


          <FormField
            LableName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />

        </div>
        <FormField
          LableName="Request Image *" placeholder="Image URL of what your Requested donation for"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)} />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton btnType="submit" title="Submit Request" styles="bg-[#1dc071]" />
        </div>
      </form>

    </div>
  )
}

export default CreateRequest