import os
import subprocess

PASTA_ENTRADA = "C:/Users/math1/Projetos/Ordem Paranormal/ordem-paranormal-ficha/backend/data/musics"
PASTA_SAIDA = "C:/Users/math1/Projetos/Ordem Paranormal/ordem-paranormal-ficha/backend/data/musics"

os.makedirs(PASTA_SAIDA, exist_ok=True)

for arquivo in os.listdir(PASTA_ENTRADA):
    if arquivo.lower().endswith(".m4a"):
        entrada = os.path.join(PASTA_ENTRADA, arquivo)
        saida = os.path.join(
            PASTA_SAIDA,
            os.path.splitext(arquivo)[0] + ".mp3"
        )

        subprocess.run([
            "ffmpeg",
            "-y",
            "-i", entrada,
            "-ab", "192k",
            saida
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        print(f"Convertido: {arquivo}")