class RequestExecution < ApplicationRecord
  has_one_attached :image
  validates :request_id, presence: true
  validates :image, presence: true
end
