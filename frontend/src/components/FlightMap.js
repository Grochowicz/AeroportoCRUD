import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import DemandaDataService from "../services/DemandaService";
import AviaoDataService from "../services/AviaoService";
import ModeloService from "../services/ModeloService";

const FlightMap = () => {
  const [demandas, setDemandas] = useState([]);
  const [avioes, setAvioes] = useState([]);
  const [modelos, setModelos] = useState([]);

  const mapStyles = { height: "80vh", width: "100%" };
  const defaultCenter = { lat: -26.3045, lng: -48.8467 }; // Joinville-SC

  useEffect(() => {
    // Buscar dados
    DemandaDataService.getAll().then(res => setDemandas(res.data));
    AviaoDataService.getAll().then(res => setAvioes(res.data));
    ModeloService.getAll().then(res => setModelos(res.data));
  }, []);

  // Cores diferentes para cada avião
  const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#008000', '#FFC0CB', '#A52A2A', '#FFD700',
    '#4B0082', '#FF1493', '#00CED1', '#32CD32', '#FF4500', '#9370DB',
    '#20B2AA', '#FF69B4', '#00FA9A', '#FF6347', '#8A2BE2', '#00BFFF',
    '#FF8C00', '#9932CC', '#00FF7F', '#FF1493', '#1E90FF', '#FFD700',
    '#FF69B4', '#00CED1', '#32CD32'
  ];

  return (
    <div className="container mt-3">
      <h2>Mapa de Trajetos dos Aviões</h2>
      <LoadScript googleMapsApiKey="AIzaSyAc1BqISr08fS4yz6uHcwxfLjjaBOZCm98">
        <GoogleMap mapContainerStyle={mapStyles} zoom={5} center={defaultCenter}>
          {demandas
            .filter(d => d.aviaoId) // Só demandas com avião atribuído
            .filter(d => d.destino !== 'Joinville') // Só demandas que não são para Joinville
            .filter(d => {
              // Filtra apenas demandas ativas no horário atual
              const now = new Date();
              const currentTime = now.getHours() * 60 + now.getMinutes();
              const startTime = timeToMinutes(d.inicio);
              const endTime = timeToMinutes(d.fim);
              
              // Demanda está ativa se o horário atual está entre início e fim
              return currentTime >= startTime && currentTime <= endTime;
            })
            .map((demanda, index) => {
              const aviao = avioes.find(a => a.id === demanda.aviaoId);
              const modelo = modelos.find(m => m.id === aviao?.modeloId);
              
              // Coordenadas (você precisará adicionar isso ao banco)
              const origem = defaultCenter; // Joinville-SC
              const destino = getDestinoCoords(demanda.destino);
              const posicaoAviao = getAviaoPosition(demanda, origem, destino);

              return (
                <div key={demanda.id}>
                  {/* Linha do trajeto */}
                  <Polyline
                    path={[origem, posicaoAviao]}
                    options={{
                      strokeColor: colors[index % colors.length],
                      strokeWeight: 2,
                      strokeOpacity: 0.8
                    }}
                  />
                  <Polyline
                    path={[posicaoAviao, destino]}
                    options={{
                      strokeColor: colors[index % colors.length],
                      strokeWeight: 2,
                      strokeOpacity: 0.3
                    }}
                  />
                  {/* Marcador do avião */}
                  <Marker
                    position={posicaoAviao}
                    title={`Avião ${aviao?.id} - ${modelo?.nome}`}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(${getAviaoRotation(origem, destino)}deg)">
                          <path d="M22 16V14L13.5 9.5V6.5C13.5 5.67 12.83 5 12 5S10.5 5.67 10.5 6.5V9.5L2 14V16L10.5 13.5V16.5L8 18V20L12 18.5L16 20V18L13.5 16.5V13.5L22 16Z" fill="${colors[index % colors.length]}"/>
                        </svg>
                      `),
                      scaledSize: new window.google.maps.Size(38, 38),
                      anchor: new window.google.maps.Point(19, 19)
                    }}
                  />
                </div>
              );
            })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

// Função para obter coordenadas do destino
const getDestinoCoords = (destino) => {
  const coords = {
    // Destinos nacionais
    'São Paulo': { lat: -23.5505, lng: -46.6333 },
    'Rio de Janeiro': { lat: -22.9068, lng: -43.1729 },
    'Brasília': { lat: -15.7801, lng: -47.9292 },
    'Curitiba': { lat: -25.4289, lng: -49.2671 },
    'Porto Alegre': { lat: -30.0346, lng: -51.2177 },
    'Salvador': { lat: -12.9714, lng: -38.5011 },
    'Recife': { lat: -8.0476, lng: -34.8770 },
    'Fortaleza': { lat: -3.7319, lng: -38.5267 },
    'Manaus': { lat: -3.1190, lng: -60.0217 },
    'Campinas': { lat: -22.9064, lng: -47.0616 },
    'Belém': { lat: -1.4554, lng: -48.4898 },
    
    // Destinos internacionais - América do Sul
    'Buenos Aires': { lat: -34.6118, lng: -58.3960 },
    'Santiago': { lat: -33.4489, lng: -70.6693 },
    'Lima': { lat: -12.0464, lng: -77.0428 },
    'Bogotá': { lat: 4.7110, lng: -74.0721 },
    'Caracas': { lat: 10.4806, lng: -66.9036 },
    
    // Destinos internacionais - América do Norte
    'Miami': { lat: 25.7617, lng: -80.1918 },
    'Nova York': { lat: 40.7128, lng: -74.0060 },
    'Toronto': { lat: 43.6532, lng: -79.3832 },
    'Chicago': { lat: 41.8781, lng: -87.6298 },
    'Los Angeles': { lat: 34.0522, lng: -118.2437 },
    'Cidade do México': { lat: 19.4326, lng: -99.1332 }
  };
  return coords[destino] || { lat: -26.3045, lng: -48.8467 }; // Joinville como fallback
};

// Função para calcular posição do avião baseada no tempo
const getAviaoPosition = (demanda, origem, destino) => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const startTime = timeToMinutes(demanda.inicio);
  const endTime = timeToMinutes(demanda.fim);
  
  if (currentTime < startTime) return origem;
  if (currentTime > endTime) return destino;
  
  // Interpolação linear da posição
  const progress = (currentTime - startTime) / (endTime - startTime);
  return {
    lat: origem.lat + (destino.lat - origem.lat) * progress,
    lng: origem.lng + (destino.lng - origem.lng) * progress
  };
};

const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

// Função para calcular rotação do avião baseada na direção do voo
const getAviaoRotation = (origem, destino) => {
  const dx = destino.lng - origem.lng;
  const dy = destino.lat - origem.lat;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  return angle;
};

export default FlightMap;