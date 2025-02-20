out_dir='public/hand_models/'
mkdir -p "${out_dir}" 
wget -P "${out_dir}" https://cdn.jsdelivr.net/npm/@mediapipe/hands/hand_landmark_full.tflite
wget -P "${out_dir}" https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands_solution_packed_assets_loader.js
wget -P "${out_dir}" https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands_solution_simd_wasm_bin.js
wget -P "${out_dir}" https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.binarypb 
wget -P "${out_dir}" https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands_solution_packed_assets.data
wget -P "${out_dir}" https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands_solution_simd_wasm_bin.wasm
