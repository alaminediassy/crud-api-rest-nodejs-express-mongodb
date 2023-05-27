import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function DashboardContent() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(format(date, "EEEE d MMMM yyyy", { locale: fr }));
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      {/* border-2 border-gray-200 border-dashed rounded-lg dark:border-red-700 */}
      <div className="p-4  mt-14">
        <div className="flex justify-between items-center pb-4">
          <div>
            <div className="">
              <h2 className="text-2xl text-gray-800 font-regular">
                Calendrier du jour
              </h2>
              <p className="text-md text-orange-600">
                {currentDate}
              </p>
            </div>
            <div>

            </div>
          </div>
          <div>
            <h1>Droite</h1>
          </div>
        </div>

      </div>
    </div>
  );
}

