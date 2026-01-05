import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { User, Heart, Shield, Check, Info } from "lucide-react";

const HEALTH_CONDITIONS = [
  "diabetes",
  "hypertension",
  "heart",
  "kidney",
  "cholesterol",
  "celiac",
  "lactose",
  "none",
];

const STORAGE_KEY = "nutriguard";

function Profile() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [condition, setCondition] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedCondition = localStorage.getItem(STORAGE_KEY);
    if (savedCondition) setCondition(savedCondition);
  }, []);

  useEffect(() => {
    if (condition) {
      localStorage.setItem(STORAGE_KEY, condition);
      setSaved(true);
      const timer = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [condition]);

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 flex justify-center">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-4 rounded-2xl shadow-lg ${theme === 'dark' ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-100"
            }`}>
            <User size={32} />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? "text-white" : "text-gray-900"
              }`}>
              {t("profile.title")}
            </h1>
            <p className={`text-sm mt-1 ${theme === 'dark' ? "text-gray-400" : "text-gray-500"
              }`}>
              {t("profile.subtitle")}
            </p>
          </div>
        </div>

        {/* Main Settings Card */}
        <div className={`rounded-3xl p-8 mb-6 shadow-xl backdrop-blur-sm border transition-all ${theme === 'dark'
            ? "bg-[#161625]/90 border-gray-800"
            : "bg-white border-gray-100"
          }`}>
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-pink-500" size={24} />
            <h2 className={`text-xl font-semibold ${theme === 'dark' ? "text-white" : "text-gray-900"
              }`}>
              Health Profile
            </h2>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? "text-gray-300" : "text-gray-700"
                }`}>
                {t("profile.healthCondition")}
              </label>

              <div className="relative">
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className={`w-full appearance-none px-6 py-4 rounded-xl text-lg font-medium outline-none transition-all cursor-pointer border ${theme === 'dark'
                      ? "bg-[#0f0f1f] border-gray-700 text-white hover:border-blue-500 focus:border-blue-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 hover:border-blue-500 focus:border-blue-500"
                    }`}
                >
                  <option value="" disabled>{t("profile.selectCondition")}</option>
                  {HEALTH_CONDITIONS.map((cond) => (
                    <option key={cond} value={cond} className={theme === 'dark' ? "bg-[#161625]" : ""}>
                      {t(`conditions.${cond}`)}
                    </option>
                  ))}
                </select>

                {/* Custom Chevron */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {saved && (
                  <motion.div
                    className="absolute -right-2 top-0 flex items-center gap-1.5 text-green-500 text-xs font-bold bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-wider"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Check size={12} strokeWidth={3} />
                    {t("profile.saved")}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className={`text-sm flex gap-2 p-4 rounded-xl ${theme === 'dark' ? "bg-blue-900/20 text-blue-200" : "bg-blue-50 text-blue-700"
              }`}>
              <Info size={18} className="shrink-0 mt-0.5" />
              This information is stored locally on your device and is used solely to personalize your food analysis results.
            </p>
          </div>
        </div>

        {/* Why This Matters Card */}
        <motion.div
          className={`p-6 rounded-2xl border flex gap-5 ${theme === 'dark'
              ? "bg-[#161625]/50 border-gray-800"
              : "bg-white/60 border-gray-200"
            }`}
          whileHover={{ scale: 1.01 }}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${theme === 'dark' ? "bg-gray-800 text-blue-400" : "bg-blue-50 text-blue-600"
            }`}>
            <Shield size={24} />
          </div>
          <div>
            <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? "text-white" : "text-gray-900"
              }`}>
              {t("profile.whyTitle")}
            </h3>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? "text-gray-400" : "text-gray-600"
              }`}>
              {t("profile.whyDesc")}
            </p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default Profile;
