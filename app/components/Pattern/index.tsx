"use client";

import { usePathname } from "next/navigation";

export const TopPattern = () => {
  const path = usePathname();
  return (
    <div>
      {path !== "/" && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fd2265"
            fillOpacity="1"
            d="M0,192L48,192C96,192,192,192,288,170.7C384,149,480,107,576,106.7C672,107,768,149,864,160C960,171,1056,149,1152,165.3C1248,181,1344,235,1392,261.3L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      )}
    </div>
  );
};

export const BottomPattern = () => {
  const path = usePathname();
  return (
    <div>
      {path !== "/" && (
        <svg
          id="visual"
          viewBox="0 0 960 540"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <path
            d="M0 345L22.8 351.7C45.7 358.3 91.3 371.7 137 371.5C182.7 371.3 228.3 357.7 274 363C319.7 368.3 365.3 392.7 411.2 412.8C457 433 503 449 548.8 453.5C594.7 458 640.3 451 686 436C731.7 421 777.3 398 823 382.2C868.7 366.3 914.3 357.7 937.2 353.3L960 349L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
            fill="#fd2265"
            stroke-linecap="round"
            stroke-linejoin="miter"
          ></path>
        </svg>
      )}
    </div>
  );
};
