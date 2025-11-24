import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { CheckCircle } from "lucide-react";

const Banner = () => {
    // Gradient class for both title and right section
    const gradientClass = "bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text";

    return (
        <div className="w-full py-12 px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

                {/* LEFT: Title */}
                <div className="text-center lg:text-left">
                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight ${gradientClass}`}>
                        Manage Your Utility Bills Smarter & Faster
                    </h1>
                </div>

                {/* CENTER: Swiper Slider */}
                <div className="w-full max-w-sm mx-auto">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        loop={true}
                        className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
                    >
                        <SwiperSlide>
                            <img
                                src="https://i.postimg.cc/PxFPyvPD/gas.jpg"
                                alt="slide"
                                className="h-[300px] w-full object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://i.postimg.cc/PfRwz9wz/electricity.jpg"
                                alt="slide"
                                className="h-[300px] w-full object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://i.postimg.cc/v8k46nJW/water.jpg"
                                alt="slide"
                                className="h-[300px] w-full object-cover"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* RIGHT: Benefits + Social Icons */}
                <div className="space-y-6 text-center lg:text-left">
                    <h2 className={`text-3xl font-bold ${gradientClass}`}>
                        Why Choose BillHub?
                    </h2>

                    <div className="space-y-4">
                        {[
                            "Pay current month bills instantly",
                            "View and download your full bill history",
                            "Powerful search & filter options",
                            "Instant PDF receipt generation",
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 justify-center lg:justify-start">
                                <CheckCircle size={24} className="text-pink-500" />
                                <p className={`font-medium ${gradientClass}`}>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>

    );
};

export default Banner;
