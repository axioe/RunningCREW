import { useEffect, useRef } from "react";

export default function KakaoMap({ points }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (points && points.length > 0) {
      const script = document.createElement("script");

      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_JS_KEY
      }&autoload=false`;

      script.async = true;

      document.head.appendChild(script);

      script.onload = () => {
        //console.log(window.kakao);

        window.kakao.maps.load(() => {
          const center = new window.kakao.maps.LatLng(
            points[0].latitude,
            points[0].longitude,
          );

          const map = new window.kakao.maps.Map(mapRef.current, {
            center,
            level: 3,
          });

          // ⭐ 여러 마커
          points.forEach((p) => {
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(p.latitude, p.longitude),
            });

            marker.setMap(map);
          });
        });
      };
    }
  }, [points]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
