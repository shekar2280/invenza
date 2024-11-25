"use client"

import { useState } from "react";
import styles from "./export.module.css"; // Adjust the import as needed

const ExportButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExportPDF = async () => {
    setLoading(true);
    setError(null);

    try {
      // Send a request to the API endpoint
      const response = await fetch("/api/exports", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to download PDF. Status code: ${response.status}`);
      }

      // Process the response as a blob (PDF file)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Trigger file download
      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(error.message);
      console.error("Failed to download PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}> {/* Apply the container class here */}
      {error && <p className={styles.error}>{error}</p>}
      <button
        className={styles.exportButton}
        onClick={handleExportPDF}
        disabled={loading}
      >
        {loading ? "Exporting..." : "Export as PDF"}
      </button>
    </div>
  );
};

export default ExportButton;
