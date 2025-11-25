import React from "react";
import { UserPlus, FolderOpen, CreditCard, FileDown } from "lucide-react";

const steps = [
    {
        title: "Create an Account",
        description: "Sign up easily using your email and start managing your bills instantly.",
        icon: UserPlus,
    },
    {
        title: "Choose Bill Category",
        description: "Select Electricity, Gas, Water, or Internet to continue.",
        icon: FolderOpen,
    },
    {
        title: "Make Payment",
        description: "Pay your monthly bills securely and quickly from our dashboard.",
        icon: CreditCard,
    },
    {
        title: "Download PDF",
        description: "Get your bill receipt instantly in PDF format and store it safely.",
        icon: FileDown,
    },
];

const HowItWorks = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-15">

            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text" data-aos="zoom-in"
                data-aos-duration="1000">
                How It Works
            </h2>

            <p className="text-center text-gray-400 dark:text-gray-200 mb-12 max-w-2xl mx-auto" data-aos="zoom-in"
                data-aos-duration="1500">
                Follow these simple steps to manage, update, and pay your utility bills with ease.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10" data-aos="zoom-in"
                data-aos-duration="2000">
                {steps.map((step, index) => {
                    const IconComponent = step.icon;

                    return (
                        <div
                            key={index}
                            className="
                group p-8 rounded-3xl border 
                border-gray-200 dark:border-gray-700
                shadow-md bg-white dark:bg-gray-900 
                transition duration-500
                hover:bg-gradient-to-br 
                hover:from-purple-600 hover:via-pink-500 hover:to-red-500
                hover:shadow-xl
              "
                        >

                            <div className="flex justify-center mb-6">
                                <div
                                    className="
                    p-5 rounded-full transition 
                    bg-gray-100 dark:bg-gray-800 
                    group-hover:bg-white/30
                  "
                                >
                                    <IconComponent
                                        size={36}
                                        className="text-gray-900 dark:text-white group-hover:text-white"
                                    />
                                </div>
                            </div>

                            <h3
                                className="
                  text-xl font-bold mb-3
                  text-gray-900 dark:text-gray-100 
                  group-hover:text-white
                "
                            >
                                {step.title}
                            </h3>

                            <p
                                className="
                  text-gray-600 dark:text-gray-300 
                  group-hover:text-white/90
                "
                            >
                                {step.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default HowItWorks;
