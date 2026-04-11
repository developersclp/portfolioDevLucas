"use client";

import React from "react";
import { deleteCertification } from "@/lib/admin-actions";
import { Trash2 } from "lucide-react";

/**
 * Client component for delete button with confirmation
 */
export function DeleteCertButton({ id, name }: { id: string; name: string }) {
  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja deletar "${name}"?`)) return;
    await deleteCertification(id);
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1.5 text-xs font-medium text-red-400 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition-colors"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
