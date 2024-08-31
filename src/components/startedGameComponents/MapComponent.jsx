export default function MapComponent() {
  return (
    <div className="w-full h-full">
      <Map
        google={google}
        zoom={14}
        initialCenter={{
          lat: 37.774929,
          lng: -122.419416,
        }}
      />
    </div>
  );
}
