import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // login | register | forgot
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "邮箱格式不正确";
    if (mode !== "forgot" && formData.password.length < 6)
      newErrors.password = "密码至少需要6位";
    if (mode === "register" && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "两次密码不一致";
    if (mode === "register" && !formData.username)
      newErrors.username = "用户名不能为空";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      console.log("提交数据:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(\`\${mode === "login" ? "登录" : mode === "register" ? "注册" : "找回密码"}成功！\`);
    } catch (error) {
      alert("请求失败，请稍后再试");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md p-6 shadow-2xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === "login" && "登录账号"}
          {mode === "register" && "注册账号"}
          {mode === "forgot" && "找回密码"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(mode === "register") && (
            <div>
              <label htmlFor="username" className="block font-medium">用户名</label>
              <input id="username" value={formData.username} onChange={handleChange} placeholder="请输入用户名" className="w-full border px-3 py-2 rounded" />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block font-medium">邮箱</label>
            <input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="请输入邮箱" className="w-full border px-3 py-2 rounded" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {(mode !== "forgot") && (
            <div>
              <label htmlFor="password" className="block font-medium">密码</label>
              <input id="password" type="password" value={formData.password} onChange={handleChange} placeholder="请输入密码" className="w-full border px-3 py-2 rounded" />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          )}

          {mode === "register" && (
            <div>
              <label htmlFor="confirmPassword" className="block font-medium">确认密码</label>
              <input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="再次输入密码" className="w-full border px-3 py-2 rounded" />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {(mode === "login") && (
            <div className="flex items-center">
              <input type="checkbox" id="remember" checked={formData.remember} onChange={handleChange} className="mr-2" />
              <label htmlFor="remember" className="text-sm">记住我</label>
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            {mode === "login" && "登录"}
            {mode === "register" && "注册"}
            {mode === "forgot" && "找回密码"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center space-y-1">
          {mode !== "login" && (
            <p>
              已有账号？
              <button className="text-blue-600 hover:underline ml-1" onClick={() => setMode("login")}>登录</button>
            </p>
          )}
          {mode !== "register" && (
            <p>
              没有账号？
              <button className="text-blue-600 hover:underline ml-1" onClick={() => setMode("register")}>注册</button>
            </p>
          )}
          {mode !== "forgot" && (
            <p>
              忘记密码？
              <button className="text-blue-600 hover:underline ml-1" onClick={() => setMode("forgot")}>找回密码</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}