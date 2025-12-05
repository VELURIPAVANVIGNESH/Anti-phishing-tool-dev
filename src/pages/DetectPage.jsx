import { useState } from "react";
import {
  Link,
  Image,
  Mail,
  QrCode,
  FileText,
  Search,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

function DetectPage() {
  const [selectedScan, setSelectedScan] = useState("url");
  const [inputValue, setInputValue] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState({ status: null, message: "" });

  const scanTypes = [
    {
      id: "url",
      icon: Link,
      label: "URL Scan",
      placeholder: "Enter URL to scan...",
    },
    {
      id: "image",
      icon: Image,
      label: "Image Scan",
      placeholder: "Upload image file...",
    },
    {
      id: "email",
      icon: Mail,
      label: "Email Analysis",
      placeholder: "Paste email content...",
    },
    {
      id: "qr",
      icon: QrCode,
      label: "QR Code Scan",
      placeholder: "Upload QR code image...",
    },
    {
      id: "file",
      icon: FileText,
      label: "File Scan",
      placeholder: "Upload file to scan...",
    },
  ];

  const handleScan = () => {
    if (!inputValue.trim()) return;

    setScanning(true);
    setResult({ status: null, message: "" });

    setTimeout(() => {
      const isThreat = Math.random() > 0.7;
      setResult({
        status: isThreat ? "threat" : "safe",
        message: isThreat
          ? "THREAT DETECTED: This content contains phishing indicators"
          : "SAFE: No threats detected in this content",
      });
      setScanning(false);
    }, 2000);
  };

  const selectedType = scanTypes.find((t) => t.id === selectedScan);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">
            THREAT DETECTION
          </h1>
          <p className="text-lg text-gray-600">
            Select a scan type and analyze content for phishing threats
          </p>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-12">
          {scanTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedScan(type.id);
                setInputValue("");
                setResult({ status: null, message: "" });
              }}
              className={`p-6 border-2 rounded-lg transition-all ${
                selectedScan === type.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <type.icon
                className={`w-8 h-8 mx-auto mb-3 ${
                  selectedScan === type.id ? "text-blue-600" : "text-gray-600"
                }`}
              />
              <p className="text-sm font-medium text-center">{type.label}</p>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            {selectedType && (
              <selectedType.icon className="w-6 h-6 text-black" />
            )}
            <h2 className="text-2xl font-bold text-black">
              {selectedType?.label}
            </h2>
          </div>

          <div className="space-y-4">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={selectedType?.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
              rows={6}
            />

            <button
              onClick={handleScan}
              disabled={scanning || !inputValue.trim()}
              className="w-full bg-black text-white py-4 rounded font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>{scanning ? "Scanning..." : "Analyze Content"}</span>
            </button>
          </div>
        </div>

        {result.status && (
          <div
            className={`border-2 rounded-lg p-8 ${
              result.status === "threat"
                ? "border-red-500 bg-red-50"
                : "border-green-500 bg-green-50"
            }`}
          >
            <div className="flex items-center space-x-4">
              {result.status === "threat" ? (
                <AlertTriangle className="w-12 h-12 text-red-600" />
              ) : (
                <CheckCircle className="w-12 h-12 text-green-600" />
              )}
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  {result.status === "threat"
                    ? "THREAT DETECTED"
                    : "CONTENT IS SAFE"}
                </h3>
                <p className="text-gray-700">{result.message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetectPage;
