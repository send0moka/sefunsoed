import { HeaderConfig } from "@/types/database"

type PanelProps = {
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export function BackgroundPanel({ config, onChange }: PanelProps) {
  const getBackgroundColorInput = () => {
    if (config.background.type === "transparent") {
      return null;
    }

    if (config.background.type === "gradient") {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gradient Color
            </label>
            <input
              type="text"
              value={config.background.color || ""}
              onChange={(e) => {
                onChange({
                  ...config,
                  background: {
                    ...config.background,
                    color: e.target.value
                  }
                })
              }}
              placeholder="e.g. bg-gradient-to-r from-indigo-500 to-purple-500"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Background Color
        </label>
        <input
          type="text"
          value={config.background.color || ""}
          onChange={(e) => {
            onChange({
              ...config,
              background: {
                ...config.background,
                color: e.target.value
              }
            })
          }}
          placeholder="e.g. bg-black/90"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Background Type
        </label>
        <select
          value={config.background.type || "solid"}
          onChange={(e) => {
            const newType = e.target.value as HeaderConfig["config"]["background"]["type"];
            let newColor = config.background.color;
            
            // Reset color when changing types
            if (newType === "transparent") {
              newColor = "";
            } else if (newType === "gradient" && !newColor?.includes("gradient")) {
              newColor = "bg-gradient-to-r from-indigo-500 to-purple-500";
            } else if (newType === "solid" && newColor?.includes("gradient")) {
              newColor = "bg-black/90";
            }

            onChange({
              ...config,
              background: {
                ...config.background,
                type: newType,
                color: newColor
              }
            })
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="solid">Solid Color</option>
          <option value="gradient">Gradient</option>
          <option value="transparent">Transparent</option>
        </select>
      </div>

      {getBackgroundColorInput()}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Backdrop Blur
        </label>
        <input
          type="text"
          value={config.background.blur || ""}
          onChange={(e) => {
            onChange({
              ...config,
              background: {
                ...config.background,
                blur: e.target.value
              }
            })
          }}
          placeholder="e.g. backdrop-blur-sm"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shadow
        </label>
        <input
          type="text"
          value={config.background.shadow || ""}
          onChange={(e) => {
            onChange({
              ...config,
              background: {
                ...config.background,
                shadow: e.target.value
              }
            })
          }}
          placeholder="e.g. shadow-lg"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Border Radius
        </label>
        <input
          type="text"
          value={config.background.rounded || ""}
          onChange={(e) => {
            onChange({
              ...config,
              background: {
                ...config.background,
                rounded: e.target.value
              }
            })
          }}
          placeholder="e.g. rounded-full"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  )
}

export function LayoutPanel({ config, onChange }: PanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Position</label>
        <input
          type="text"
          value={config.layout.position}
          onChange={(e) => {
            onChange({
              ...config,
              layout: {
                ...config.layout,
                position: e.target.value
              }
            })
          }}
          placeholder="e.g. fixed"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Max Width</label>
        <input
          type="text"
          value={config.layout.maxWidth}
          onChange={(e) => {
            onChange({
              ...config,
              layout: {
                ...config.layout,
                maxWidth: e.target.value
              }
            })
          }}
          placeholder="e.g. max-w-6xl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Display</label>
        <input
          type="text"
          value={config.layout.display}
          onChange={(e) => {
            onChange({
              ...config,
              layout: {
                ...config.layout,
                display: e.target.value
              }
            })
          }}
          placeholder="e.g. flex"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Alignment</label>
        <input
          type="text"
          value={config.layout.alignment}
          onChange={(e) => {
            onChange({
              ...config,
              layout: {
                ...config.layout,
                alignment: e.target.value
              }
            })
          }}
          placeholder="e.g. items-center justify-between"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Update padding inputs to accept string values */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Padding Top</label>
          <input
            type="text"
            value={config.layout.padding.top}
            onChange={(e) => {
              onChange({
                ...config,
                layout: {
                  ...config.layout,
                  padding: {
                    ...config.layout.padding,
                    top: e.target.value
                  }
                }
              })
            }}
            placeholder="e.g. py-1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Padding Bottom</label>
          <input
            type="text"
            value={config.layout.padding.bottom}
            onChange={(e) => {
              onChange({
                ...config,
                layout: {
                  ...config.layout,
                  padding: {
                    ...config.layout.padding,
                    bottom: e.target.value
                  }
                }
              })
            }}
            placeholder="e.g. py-1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Padding Left</label>
          <input
            type="text"
            value={config.layout.padding.left}
            onChange={(e) => {
              onChange({
                ...config,
                layout: {
                  ...config.layout,
                  padding: {
                    ...config.layout.padding,
                    left: e.target.value
                  }
                }
              })
            }}
            placeholder="e.g. px-4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Padding Right</label>
          <input
            type="text"
            value={config.layout.padding.right}
            onChange={(e) => {
              onChange({
                ...config,
                layout: {
                  ...config.layout,
                  padding: {
                    ...config.layout.padding,
                    right: e.target.value
                  }
                }
              })
            }}
            placeholder="e.g. px-4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  )
}

export function LogoPanel({ config, onChange }: PanelProps) {
  return (
    <div className="space-y-4">
      {/* Semua input diubah menjadi string untuk class Tailwind */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Width Class
        </label>
        <input
          type="text"
          value={typeof config.logo.width === 'string' ? config.logo.width : ''}
          onChange={(e) => {
            onChange({
              ...config,
              logo: {
                ...config.logo,
                width: e.target.value
              }
            })
          }}
          placeholder="e.g. w-[100px]"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Height Class
        </label>
        <input
          type="text"
          value={typeof config.logo.height === 'string' ? config.logo.height : ''}
          onChange={(e) => {
            onChange({
              ...config,
              logo: {
                ...config.logo,
                height: e.target.value
              }
            })
          }}
          placeholder="e.g. h-12"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Brightness Class
        </label>
        <input
          type="text"
          value={typeof config.logo.brightness === 'string' ? config.logo.brightness : ''}
          onChange={(e) => {
            onChange({
              ...config,
              logo: {
                ...config.logo,
                brightness: e.target.value
              }
            })
          }}
          placeholder="e.g. brightness-0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Invert Class
        </label>
        <input
          type="text"
          value={typeof config.logo.invert === 'string' ? config.logo.invert : ''}
          onChange={(e) => {
            onChange({
              ...config,
              logo: {
                ...config.logo,
                invert: e.target.value
              }
            })
          }}
          placeholder="e.g. invert"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  )
}

export function NavigationPanel({ config, onChange }: PanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Font Size
        </label>
        <input
          type="text"
          value={config.navigation.fontSize}
          onChange={(e) => {
            onChange({
              ...config,
              navigation: {
                ...config.navigation,
                fontSize: e.target.value
              }
            })
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Font Weight
        </label>
        <select
          value={config.navigation.fontWeight}
          onChange={(e) => {
            onChange({
              ...config,
              navigation: {
                ...config.navigation,
                fontWeight: e.target.value
              }
            })
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
          <option value="semibold">Semibold</option>
          <option value="bold">Bold</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Text Color
        </label>
        <input
          type="text"
          value={config.navigation.textColor}
          onChange={(e) => {
            onChange({
              ...config,
              navigation: {
                ...config.navigation,
                textColor: e.target.value
              }
            })
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Hover Color
        </label>
        <input
          type="text"
          value={config.navigation.hoverColor}
          onChange={(e) => {
            onChange({
              ...config,
              navigation: {
                ...config.navigation,
                hoverColor: e.target.value
              }
            })
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  )
}

export function ButtonsPanel({ config, onChange }: PanelProps) {
  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium">Primary Button</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Background Color
            </label>
            <input
              type="text"
              value={config.buttons.primary.backgroundColor}
              onChange={(e) => {
                onChange({
                  ...config,
                  buttons: {
                    ...config.buttons,
                    primary: {
                      ...config.buttons.primary,
                      backgroundColor: e.target.value
                    }
                  }
                })
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Text Color
            </label>
            <input
              type="text"
              value={config.buttons.primary.textColor}
              onChange={(e) => {
                onChange({
                  ...config,
                  buttons: {
                    ...config.buttons,
                    primary: {
                      ...config.buttons.primary,
                      textColor: e.target.value
                    }
                  }
                })
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Language Button</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Background Color
            </label>
            <input
              type="text"
              value={config.buttons.language.backgroundColor}
              onChange={(e) => {
                onChange({
                  ...config,
                  buttons: {
                    ...config.buttons,
                    language: {
                      ...config.buttons.language,
                      backgroundColor: e.target.value
                    }
                  }
                })
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Text Color
            </label>
            <input
              type="text"
              value={config.buttons.language.textColor}
              onChange={(e) => {
                onChange({
                  ...config,
                  buttons: {
                    ...config.buttons,
                    language: {
                      ...config.buttons.language,
                      textColor: e.target.value
                    }
                  }
                })
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}