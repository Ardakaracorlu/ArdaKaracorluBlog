using Blog.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Linq.Expressions;

namespace Blog.Data.Repository
{
    public class BaseRepository<TEntity, TContext> : IRepository<TEntity>
            where TEntity : class, IEntity, new()
            where TContext : DbContext, new()
    {
        public TEntity Get(Expression<Func<TEntity, bool>> filter)
        {
            using (var context = new TContext())
            {
                return context.Set<TEntity>().SingleOrDefault(filter);
            }
        }
        public int GetCount(Expression<Func<TEntity, bool>> filter)
        {
            using (var context = new TContext())
            {
                return filter == null
                    ? context.Set<TEntity>().Count()
                    : context.Set<TEntity>().Where(filter).Count();
            }
        }

        public List<TEntity> GetList(Expression<Func<TEntity, bool>> filter = null)
        {
            using (var context = new TContext())
            {
                return filter == null
                    ? context.Set<TEntity>().ToList()
                    : context.Set<TEntity>().Where(filter).ToList();

            }
        }

        public void Add(TEntity entity)
        {
            using (var context = new TContext())
            {
                var addedEntity = context.Entry(entity);
                addedEntity.State = EntityState.Added;
                context.SaveChanges();
            }
        }
        public void AddRange(IEnumerable<TEntity> entities)
        {
            using (var context = new TContext())
            {
                context.AddRange(entities);
                context.SaveChanges();
            }
        }
        public void Update(TEntity entity)
        {
            using (var context = new TContext())
            {
                var updatedEntity = context.Entry(entity);
                updatedEntity.State = EntityState.Modified;
                context.SaveChanges();
            }
        }
        public void Delete(TEntity entity)
        {
            using (var context = new TContext())
            {
                var deleteEntity = context.Entry(entity);
                deleteEntity.State = EntityState.Deleted;
                context.SaveChanges();
            }
        }
        public void DeleteRange(IEnumerable<TEntity> entities)
        {
            using (var context = new TContext())
            {
                context.RemoveRange(entities);
                context.SaveChanges();
            }
        }
        public TEntity GetLastIndex(Expression<Func<TEntity, bool>> filter = null)
        {
            using (var context = new TContext())
            {
                return context.Set<TEntity>().Where(filter).ToList().LastOrDefault();
            }
        }
        public void DeleteWithCond(Expression<Func<TEntity, bool>> filter)
        {
            using (var context = new TContext())
            {
                var retVal = filter == null
                    ? context.Set<TEntity>().ToList()
                    : context.Set<TEntity>().Where(filter).ToList();

                DeleteRange(retVal);
            }
        }
        public List<TEntity> TakeCount(int count, Expression<Func<TEntity, bool>> filter = null)
        {
            using (var context = new TContext())
            {
                return filter == null
                    ? context.Set<TEntity>().Take(count).ToList()
                    : context.Set<TEntity>().Where(filter).Take(count).ToList();
            }
        }

        public void AddRangeWithDelete(IEnumerable<TEntity> Addentities, IEnumerable<TEntity> Deleteentities)
        {
            using (var context = new TContext())
            {
                context.RemoveRange(Deleteentities);
                context.AddRange(Addentities);
                context.SaveChanges();
            }
        }
        public void UpdateRange(IEnumerable<TEntity> entities)
        {
            using (var context = new TContext())
            {
                foreach (var entity in entities)
                {
                    var updatedEntity = context.Entry(entity);
                    updatedEntity.State = EntityState.Modified;
                    context.SaveChanges();
                }
            }
        }
        private string cache_key = $"{typeof(TEntity)}";
        public List<TEntity> CacheGetList(IMemoryCache _IMemoryCache, int minute, bool Status)
        {
            using (var context = new TContext())
            {
                if (!Status)
                {
                    return context.Set<TEntity>().ToList();
                }
                _IMemoryCache.TryGetValue(cache_key, out object listOfCacheTEntity);
                List<TEntity> listOfTEntity = new List<TEntity>();
                if (listOfCacheTEntity != null)
                {
                    listOfTEntity = (List<TEntity>)listOfCacheTEntity;
                    if (!listOfTEntity.Any())
                    {
                        listOfTEntity = context.Set<TEntity>().ToList();
                        _IMemoryCache.Set(cache_key, listOfTEntity, new MemoryCacheEntryOptions
                        {
                            AbsoluteExpiration = DateTime.Now.AddMinutes(minute),
                            Priority = CacheItemPriority.High
                        });
                    }
                }
                else
                {
                    listOfTEntity = context.Set<TEntity>().ToList();
                    _IMemoryCache.Set(cache_key, listOfTEntity, new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(minute),
                        Priority = CacheItemPriority.High
                    });
                }
                return listOfTEntity;
            }

        }
        public void CacheAdd(IMemoryCache _IMemoryCache, TEntity entity)
        {
            using (var context = new TContext())
            {
                var addedEntity = context.Entry(entity);
                addedEntity.State = EntityState.Added;
                context.SaveChanges();
                _IMemoryCache.Remove(cache_key);
            }
        }

        public bool CacheRemove(IMemoryCache _IMemoryCache)
        {
            _IMemoryCache.Remove(cache_key);
            return true;
        }
    }
}
