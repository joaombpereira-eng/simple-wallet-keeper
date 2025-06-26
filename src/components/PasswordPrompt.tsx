import React, { useState } from "react";

type Props = {
  title: string;
  onConfirm: (password: string) => void;
  onCancel: () => void;
};

export const PasswordPrompt = ({
  title,
  onConfirm,
  onCancel,
}: Props): React.ReactElement => {
  const [password, setPassword] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(password)}
            className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
