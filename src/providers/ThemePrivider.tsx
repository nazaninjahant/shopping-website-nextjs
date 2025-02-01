import React from "react";
import { ConfigProvider } from "antd";
function ThemePrivider({
    children
}: {
    children: React.ReactNode
}
) {
    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#157694",
                        borderRadius: 10
                    }
                }}
            >
                {children}
            </ConfigProvider>
        </div>
    )
}

export default ThemePrivider