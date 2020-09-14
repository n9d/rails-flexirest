class Article < ApplicationRecord
  validates :title, presence: true, length: { maximum: 10 }
  validates :text, presence: true, length: { maximum: 10 }
end
