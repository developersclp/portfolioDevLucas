"use client";

import React, { useState } from "react";
import { createCategory, updateCategory, deleteCategory } from "@/lib/admin-actions";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  projectCount: number;
  certCount: number;
}

/**
 * Inline category CRUD manager
 */
export function CategoryManager({ categories: initialCategories }: { categories: CategoryItem[] }) {
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setError(null);
    const formData = new FormData();
    formData.set("name", newName.trim());
    try {
      await createCategory(formData);
      setNewName("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao criar categoria");
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) return;
    const formData = new FormData();
    formData.set("name", editingName.trim());
    await updateCategory(id, formData);
    setEditingId(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja deletar "${name}"?`)) return;
    setError(null);
    try {
      await deleteCategory(id);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao deletar categoria");
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Create New */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nome da nova categoria"
          className="flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <button
          onClick={handleCreate}
          className="px-5 py-3 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* List */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden">
        {initialCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/30 last:border-b-0 hover:bg-zinc-800/20 transition-colors"
          >
            {editingId === cat.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:border-emerald-400/50 outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleUpdate(cat.id)}
                  autoFocus
                />
                <button
                  onClick={() => handleUpdate(cat.id)}
                  className="p-1.5 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1.5 text-zinc-400 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm font-medium text-white">{cat.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {cat.projectCount} projetos • {cat.certCount} certificações
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingId(cat.id);
                      setEditingName(cat.name);
                    }}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {initialCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500">Nenhuma categoria cadastrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}
