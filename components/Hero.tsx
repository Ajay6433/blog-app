import React from "react";
import Image from "next/image";

const Hero = () => {
  let data = [
    {
      id: 1,
      image: "/blogging.png",
      title: "Your Words Have Power",
      paragraph:
        "Welcome to our community of bloggers, where your words have the power to connect, inspire, and transform. Here, we provide you with a safe space to share your experiences, reflections, and knowledge with an enthusiastic audience.",
    },
    {
      id: 2,
      image: "/community.png",
      title: "A Platform to Express Your Ideas",
      paragraph:
        "Our objective is simple: to provide you with a platform where you can express yourself and share your stories with the world. With our website, you can create, edit, and delete blogs as you please. Whether you want to write about your travels, your professional career, your passions, or any other topic, this is the perfect place for you.",
    },
    {
      id: 3,
      image: "/typing.png",
      title: "Start Your Journey with Us",
      paragraph:
        "If you're ready to share your stories and be part of a community passionate about writing, join us. Here, you can not only create your first blog but also read the experiences and stories of others. Find inspiration, share your thoughts, and connect with others who, like you, have something unique to say. Don't wait any longer—start your journey with us and create your first blog today!",
    },
  ];

  return (
    <div className="w-full z-20 mt-3 px-4 md:px-8 lg:px-16">
      {data.map((item) => (
        <div
          key={item.id}
          className="p-6 flex flex-col md:flex-row justify-center items-center gap-5 bg-white rounded-lg mb-6"
        >
          <Image
            src={item.image}
            alt={item.title}
            width={100}
            height={100}
            className="mb-4 md:mb-0"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              {item.title}
            </h2>
            <p className="text-gray-600 text-[14px] md:text-[16px] text-justify">
              {item.paragraph}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
