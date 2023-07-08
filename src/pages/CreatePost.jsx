import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import preview from '../assets/preview.png';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/.png;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-7x1 mx-auto">
<div>
  <h1 className="font-extrabold text-white text-[32px]">Create</h1>
  <p className="mt-2 text-[#6cbbfc] text-[16px] max-w [500px]">Create imaginative and visually stunning images and share them with the community</p>
</div>
<form className="mt-16 max-w-3x1"onSubmit={handleSubmit}>
  <div className="flex flex-col gap-5">
    <FormField 
    labelName="Your name"
    type="text"
    name="name"
    placeholder="Your name"
    value={form.name}
    handleChange={handleChange}
    />
<FormField 
    labelName="Prompt"
    type="text"
    name="prompt"
    placeholder="A plush toy robot sitting against a yellow wall"
    value={form.prompt}
    handleChange={handleChange}
    isSurpriseMe
    handleSurpriseMe={handleSurpriseMe}
    />

    <div className="relative bg-[#121212] border border-[#2f2f2f]  text-gray-300 text-sm rounded-lg focus:ring-[#1fa8fd] focus:border-[#1fa8fd] w-64 p-3 h-64 flex justify-center items-center">
      {form.photo ? (
        <img 
        src={form.photo}
        alt={form.prompt}
        className="w-full h-full object-contain"
    />
      ): (
        <img 
        src={preview}
        alt="preview"
        className="w-9/12 h-9/12 object-contain opacity-50"
      />
      )}

      {generatingImg && (
        <div className="absolute inset-0 z-0 flex justify-center items-center bg-[#121212] rounded-lg"> 
          <Loader />
          </div>
        )}
    </div>
  </div>
  <div className="mt-5 flex gap-5">
    <button
    type="button"
    onClick={generateImage}
className="text-white bg-[#0358f6] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    >
{generatingImg ? 'Generating...' : 'Generate Image'}
</button>
  </div>

  <div className="mt-10">
<p className="mt-2 text-[#6cbbfc] text[14px]">Once you have created the image you want, you can share it with others in the community</p>
  <button
  type="submit"
  className="mt-5 text-white bg-[#0358f6] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.25 text-center"
  >
{loading ? 'Sharing...' : 'Share whit the community'}
  </button>
  </div>
</form>
    </section>
  );
};

export default CreatePost;
