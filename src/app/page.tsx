import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              WELCOME TO MALAWI EDUCATION{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-600">
                ENHANCEMENT PLATFORM
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-black-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                A website to that simplies what you learn in class to increase
                your understanding for best grades
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div className="mt-8 flex justify-between max-w-sm mx-auto gap-[100px]">
                  <button className="bg-gray-700 text-gray-200 hover:text-green-600 hover:cursor-pointer font-semibold rounded-lg shadow-lg py-2 px-6">
                    <Link href="/login">Login</Link>
                  </button>

                  <button className="bg-gray-700 px-6 text-gray-200 hover:text-green-600 hover:cursor-pointer font-semibold rounded-lg shadow-lg py-2">
                    <Link href="/signup">Register</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
