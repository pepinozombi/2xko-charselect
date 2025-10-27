import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { MainLayout } from "@/components/layout/MainLayout";

// Si más adelante creas otra página, por ejemplo LoadingPreview
// import LoadingPreview from "@/pages/LoadingPreview";

export function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/loading" element={<LoadingPreview />} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}