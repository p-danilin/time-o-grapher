import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import uniform_filter1d
import yaml

_BLOB_COLOR = "#1f77b4"
_BLOB_ALPHA = 0.75
_FRAME_SIZE = 12

def plot_timeseries(audio, sample_rate, xlabel="Time (s)", ylabel="Amplitude", 
                    xmin=None, xmax=None, title="Waveform", vlines=None, blob=False):
    time_axis = np.linspace(0, len(audio) / sample_rate, num=len(audio))

    if blob:
        envelope = uniform_filter1d(np.abs(audio), size=_FRAME_SIZE)
        plt.fill_between(time_axis, envelope, -envelope, color=_BLOB_COLOR, alpha=_BLOB_ALPHA)
        plt.axhline(0, color='black', linewidth=0.5)
        # plt.ylim(-1.1 * np.max(envelope), 1.1 * np.max(envelope))
        plt.yticks([])
    else:
        plt.plot(time_axis, audio)
        plt.ylabel(ylabel)

    if vlines:
        for x in vlines:
            plt.axvline(x=x, color='red', linestyle='--', linewidth=1)

    plt.title(title, fontsize=14)
    plt.xlabel(xlabel)
    if xmin is not None or xmax is not None:
        plt.xlim(xmin, xmax)
    plt.grid(not blob)
    plt.tight_layout()
    plt.show()

def load_samples(yaml_path="samples.yaml"):
    with open(yaml_path, "r") as f:
        return yaml.safe_load(f)
