import { Link } from "react-router-dom";
import { Camera, Brain, Shield, ArrowRight, Activity, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

function Home() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center px-4 sm:px-6 relative overflow-hidden">

      {/* Background Decor Elements */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 bg-gradient-radial from-blue-500/10 to-transparent blur-3xl`} />

      {/* Hero Section */}
      <motion.div
        className="text-center max-w-4xl mx-auto mt-10 md:mt-20 mb-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${theme === "dark"
              ? "bg-blue-500/10 border-blue-500/20 text-blue-300"
              : "bg-blue-50 border-blue-200 text-blue-700"
            }`}>
            <Activity size={16} />
            <span>AI-Powered Nutrition Analysis</span>
          </span>
        </motion.div>

        <motion.h1
          className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r ${theme === "dark"
              ? "from-white via-blue-100 to-blue-200"
              : "from-gray-900 via-blue-800 to-gray-900"
            }`}
          variants={itemVariants}
        >
          {t("appName")}
        </motion.h1>

        <motion.p
          className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          variants={itemVariants}
        >
          {t("tagline")}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/scan"
            className={`group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${theme === "dark"
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
              }`}
          >
            {t("startScanning")}
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-4 rounded-xl font-medium text-lg border transition-all duration-300 ${theme === "dark"
                ? "border-gray-700 hover:bg-gray-800 text-gray-300"
                : "border-gray-200 hover:bg-gray-50 text-gray-700"
              }`}
          >
            Learn More
          </button>
        </motion.div>
      </motion.div>

      {/* Features/Steps Section */}
      <motion.div
        id="how-it-works"
        className={`w-full max-w-6xl rounded-[2.5rem] p-8 md:p-16 shadow-2xl border backdrop-blur-sm transition-colors ${theme === "dark"
            ? "bg-[#161625]/80 border-gray-800"
            : "bg-white/90 border-gray-100"
          }`}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
            {t("howItWorks")}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
            Get detailed nutritional insights and safety alerts in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className={`hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`} />

          {[
            {
              icon: <Camera size={32} className="text-white" />,
              bg: "bg-purple-500",
              title: t("steps.upload.title"),
              desc: t("steps.upload.desc"),
            },
            {
              icon: <Brain size={32} className="text-white" />,
              bg: "bg-blue-500",
              title: t("steps.analysis.title"),
              desc: t("steps.analysis.desc"),
            },
            {
              icon: <Shield size={32} className="text-white" />,
              bg: "bg-emerald-500",
              title: t("steps.safety.title"),
              desc: t("steps.safety.desc"),
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col items-center text-center group z-10`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${step.bg}`}>
                {step.icon}
              </div>

              <h3 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                {step.title}
              </h3>
              <p className={`text-sm leading-relaxed px-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 pt-10 border-t flex flex-wrap justify-center gap-8 ${theme === "dark" ? "border-gray-800" : "border-gray-100"
          }`}>
          {["Instant Analysis", "99% Accuracy", "Doctor Verified Data", "Secure Privacy"].map((badge, i) => (
            <div key={i} className={`flex items-center gap-2 text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}>
              <CheckCircle2 size={16} className="text-blue-500" />
              {badge}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
